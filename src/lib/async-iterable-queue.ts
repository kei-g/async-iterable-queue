import { EventEmitter } from 'node:events'
import { assert } from 'node:console'

/**
 * 非同期反復可能な先入れ先出し型の待ち行列への非同期反復子
 */
class AIQAsyncIterator<T> implements AsyncIterator<T> {
  /**
   * 事象発生器への参照
   */
  readonly #emitter: EventEmitter

  /**
   * 反復結果解決関数の配列への参照
   */
  readonly #resolvers: IteratorResultResolver<T>[]

  /**
   * コンストラクタ
   * @param emitter 事象発生器への参照
   * @param resolvers 反復結果解決関数の配列への参照
   */
  constructor(
    emitter: EventEmitter,
    resolvers: IteratorResultResolver<T>[],
  ) {
    this.#emitter = emitter
    this.#resolvers = resolvers
  }

  /**
   * 次の要素を返す
   * @returns 次の要素
   */
  next(): Promise<IteratorResult<T>> {
    return new Promise(
      (
        resolve: IteratorResultResolver<T>,
      ) => {
        this.#resolvers.push(resolve)
        this.#emitter.emit('deq')
      }
    )
  }
}

/**
 * 非同期反復可能な先入れ先出し型の待ち行列の状態を表す型
 */
enum AIQState {
  // NOTE: - False positive warnings
  ending = 1,
  finished = 2,
  undefined = 0,
}

/**
 * 非同期反復可能な先入れ先出し型の待ち行列
 */
export class AsyncIterableQueue<T> implements AsyncIterable<T> {
  /**
   * 事象発生器
   */
  readonly #emitter = new EventEmitter()

  /**
   * 先入れ先出し型の待ち行列
   */
  readonly #queue = [] as Terminatable<T>[]

  /**
   * 反復結果解決関数の配列
   */
  readonly #resolvers = [] as IteratorResultResolver<T>[]

  /**
   * この待ち行列の現在の状態
   */
  readonly #state = new Uint8Array(new SharedArrayBuffer(1))

  /**
   * コンストラクタ
   */
  constructor() {
    this.#state[0] = AIQState.undefined
    const resolveAsync = createAsyncResolver(
      {
        finish: () =>
          Atomics.exchange(
            this.#state,
            0,
            AIQState.finished,
          ),
        resolvers: this.#resolvers,
      }
    )
    this.#emitter.on(
      'deq',
      async () => {
        while (this.#queue.length
          && this.#resolvers.length)
          await resolveAsync(
            this.#queue.shift()
          )
      }
    )
    this.#emitter.on(
      'enq',
      async (value: Terminatable<T>) =>
        this.#resolvers.length
          ? await resolveAsync(value)
          : this.#queue.push(value)
    )
  }

  /**
   * この待ち行列への要素の追加を終了する
   * @param cb 終端が読み取られた後に呼ばれるコールバック関数
   */
  end(
    cb?: NoParameterCallback,
  ): Promise<void> {
    return new Promise(
      (
        resolve: Resolver<void>,
        reject: SingleParameterAction<unknown>,
      ) => {
        const state = Atomics.compareExchange(
          this.#state,
          0,
          AIQState.undefined,
          AIQState.ending,
        )
        if (state !== AIQState.undefined)
          return reject(
            new Error(AIQState[state])
          )
        this.#emitter.emit(
          'enq',
          new Terminator(cb),
        )
        return resolve()
      }
    )
  }

  /**
   * この待ち行列の末尾に要素を追加する
   * @param value 要素の値
   */
  push(value: T): Promise<void> {
    return new Promise(
      (
        resolve: Resolver<void>,
        reject: SingleParameterAction<unknown>,
      ) => {
        const state = Atomics.load(
          this.#state,
          0,
        )
        if (state !== AIQState.undefined)
          return reject(
            new Error(AIQState[state])
          )
        this.#emitter.emit(
          'enq',
          value,
        )
        return resolve()
      }
    )
  }

  /**
   * 非同期反復子を返す
   * @returns 非同期反復子
   */
  [Symbol.asyncIterator](): AsyncIterator<T> {
    return new AIQAsyncIterator(
      this.#emitter,
      this.#resolvers,
    )
  }
}

/**
 * 反復結果解決関数を非同期的に処理する関数を作成する際のパラメータの型
 */
type AsyncResolverCreateParameter<T> = {
  /**
   * 非同期反復可能な先入れ先出し型の待ち行列を終了状態にする
   * @returns 以前の状態を返す
   */
  finish(): AIQState

  /**
   * 反復結果解決関数の配列への参照を取得する
   */
  get resolvers(): IteratorResultResolver<T>[]
}

/**
 * 反復結果解決関数型
 */
type IteratorResultResolver<T> =
  Resolver<IteratorResult<T>>

/**
 * 引数無しコールバック関数型
 */
type NoParameterCallback =
  () => PromiseLike<void> | void

/**
 * 解決関数型
 */
type Resolver<T> =
  SingleParameterAction<T>

/**
 * 引数1個の関数型
 */
type SingleParameterAction<T> =
  (_arg: T) => void

/**
 * 終端
 */
class Terminator {
  private readonly cb?: NoParameterCallback

  /**
   * コンストラクタ
   * @param cb コールバック関数
   */
  constructor(cb?: NoParameterCallback) {
    this.cb = cb
  }

  /**
   * コールバック関数を呼び出す
   */
  call(): Promise<void> {
    return new Promise(
      (
        resolve: Resolver<void>,
        reject: SingleParameterAction<unknown>,
      ) => {
        if (this.cb)
          try {
            const result = this.cb()
            if (result instanceof Promise)
              return result.catch(reject).then(resolve)
          }
          catch (err: unknown) {
            return reject(err)
          }
        return resolve()
      }
    )
  }
}

/**
 * 終端可能型
 */
type Terminatable<T> =
  Terminator | T

/**
 * 反復結果解決関数を非同期的に処理する関数を作成する
 * @param param パラメータ
 * @returns 反復結果解決関数を非同期的に処理する関数を返す
 */
const createAsyncResolver = <T>(
  param: AsyncResolverCreateParameter<T>,
) => {
  const resolveAsync = (
    result: IteratorResult<T>,
  ) =>
    new Promise(
      (
        callback: Resolver<void>,
      ) => {
        const resolver = param.resolvers.shift()
        resolver(result)
        callback()
      }
    )
  return async (
    value: Terminatable<T>,
  ) => {
    if (value instanceof Terminator) {
      const state = param.finish()
      await resolveAsync(
        {
          done: true
        } as IteratorResult<T>
      )
      assert(state === AIQState.ending)
      await value.call()
    }
    else
      await resolveAsync(
        {
          done: false,
          value,
        }
      )
  }
}

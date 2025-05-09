import { AsyncIterableQueue } from '../src'
import { describe, it } from 'mocha'
import { equal } from 'node:assert'

const source = [
  Math.LN2,
  Math.LN10,
  Math.E,
  Math.PI,
]

const popAsync = async (q: AsyncIterableQueue<number>) => {
  let index = 0
  for await (const value of q)
    equal(value, source[index++])
}

describe(
  'failure mission',
  async () => {
    it(
      'call \'end\' twice',
      async () => {
        const q = new AsyncIterableQueue<number>()
        const pushAsync = async () => {
          for (const value of source)
            await q.push(value)
          await q.end()
          let error: Error
          await q.end()
            .catch(
              (reason: unknown) => {
                if (reason instanceof Error)
                  error = reason
              }
            )
            .finally(
              () => equal(error instanceof Error, true)
            )
        }
        await Promise.all([popAsync(q), pushAsync()])
      }
    )
    it(
      '\'push\' after \'end\'',
      async () => {
        const q = new AsyncIterableQueue<number>()
        const pushAsync = async () => {
          for (const value of source)
            await q.push(value)
          await q.end()
          let error: Error
          await q.push(Math.SQRT2)
            .catch(
              (reason?: unknown) => {
                if (reason instanceof Error)
                  error = reason
              }
            )
            .finally(
              () => equal(error instanceof Error, true)
            )
        }
        await Promise.all([popAsync(q), pushAsync()])
      }
    )
    it(
      'with callback which throws an error',
      async () => {
        const q = new AsyncIterableQueue<number>()
        const pushAsync = async () => {
          for (const value of source)
            await q.push(value)
          await q.end(
            () => {
              throw new Error()
            }
          ).catch(
            (reason?: unknown) => equal(reason instanceof Error, true)
          )
        }
        await Promise.all([popAsync(q), pushAsync()])
      }
    )
  }
)

describe(
  'successful mission',
  async () => {
    it(
      'parallel push',
      async () => {
        const q = new AsyncIterableQueue<number>()
        const pushAsync = async () => {
          await Promise.all(source.map((value: number) => q.push(value)))
          await q.end()
        }
        await Promise.all([popAsync(q), pushAsync()])
      }
    )
    it(
      'with async callback',
      async () => {
        const q = new AsyncIterableQueue<number>()
        const pushAsync = async () => {
          for (const value of source)
            await q.push(value)
          let complete = false
          await q.end(
            () => new Promise<void>(
              (resolve: () => void) => {
                complete = true
                resolve()
              }
            )
          )
          equal(complete, true)
        }
        await Promise.all([popAsync(q), pushAsync()])
      }
    )
    it(
      'with callback',
      async () => {
        const q = new AsyncIterableQueue<number>()
        const pushAsync = async () => {
          for (const value of source)
            await q.push(value)
          let complete = false
          await q.end(
            () => {
              complete = true
            }
          )
          equal(complete, true)
        }
        await Promise.all([popAsync(q), pushAsync()])
      }
    )
    it(
      'without callback',
      async () => {
        const q = new AsyncIterableQueue<number>()
        const pushAsync = async () => {
          for (const value of source)
            await q.push(value)
          await q.end()
        }
        await Promise.all([popAsync(q), pushAsync()])
      }
    )
  }
)

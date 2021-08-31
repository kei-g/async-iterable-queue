
import { AsyncIterableQueue } from './src'

type Foo = {
  id: number
  name: string
}

async function example1(queue: AsyncIterableQueue<Foo>): Promise<void> {
  console.debug('pushing 123')
  await queue.push({
    id: 123,
    name: 'foo',
  })
  console.debug('123 has been pushed')
  await queue.push({
    id: 456,
    name: 'bar',
  })
  console.debug('456 has been pushed')
  await queue.push({
    id: 789,
    name: 'baz',
  })
  console.debug('789 has been pushed')
  await queue.end()
  console.debug('\'end\' has been pushed')
}

async function example2(queue: AsyncIterableQueue<Foo>): Promise<void> {
  for await (const value of queue)
    console.debug(value)
  console.debug('all elements have been popped from queue')
}

async function example(): Promise<void> {
  console.debug('example for AsyncIterableQueue has begun')
  const queue = new AsyncIterableQueue<Foo>()
  await Promise.all([
    example1(queue),
    example2(queue),
  ])
  console.debug('example for AsyncIterableQueue has finished')
}

example()

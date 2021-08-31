# async-iterable-queue [![License][license-image]][license-url] [![Dependency][depencency-image]][dependency-url] [![GitHub][github-test-image]][github-url] [![Travis][travis-image]][travis-url] [![npm][npm-image]][npm-url]

[![coverage][nyc-cov-image]][github-url] [![maintenance][maintenance-image]][npmsio-url] [![quality][quality-image]][npmsio-url]

`async-iterable-queue` - A library for 'Queue' class which implements AsyncIterable\<T\> works on [Node.js](https://nodejs.org/)

## Installation

```shell
npm i async-iterable-queue
```

## Usage

```typescript
import { AsyncIterableQueue } from 'async-iterable-queue'

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
```

[depencency-image]:https://img.shields.io/librariesio/release/npm/async-iterable-queue?logo=nodedotjs
[dependency-url]:https://npmjs.com/package/async-iterable-queue?activeTab=dependencies
[github-test-image]:https://img.shields.io/github/workflow/status/kei-g/async-iterable-queue/test/main?label=build%20%26%20test&logo=github
[github-url]:https://github.com/kei-g/async-iterable-queue
[license-image]:https://img.shields.io/github/license/kei-g/async-iterable-queue
[license-url]:https://opensource.org/licenses/BSD-3-Clause
[maintenance-image]:https://img.shields.io/npms-io/maintenance-score/async-iterable-queue?logo=npm
[npm-image]:https://img.shields.io/npm/v/async-iterable-queue.svg?logo=npm
[npm-url]:https://npmjs.org/package/async-iterable-queue
[npmsio-url]:https://npms.io/search?q=async-iterable-queue
[nyc-cov-image]:https://img.shields.io/nycrc/kei-g/async-iterable-queue?config=.nycrc.json&label=coverage
[quality-image]:https://img.shields.io/npms-io/quality-score/async-iterable-queue?logo=npm
[travis-image]:https://img.shields.io/travis/kei-g/async-iterable-queue/main.svg?logo=travis
[travis-url]:https://travis-ci.org/kei-g/async-iterable-queue

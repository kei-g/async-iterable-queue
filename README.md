# async-iterable-queue [![license][license-image]][license-url] [![npm][npm-image]][npm-url]

[![dependency][depencency-image]][dependency-url] [![maintenance][maintenance-image]][npmsio-url] [![quality][quality-image]][npmsio-url]

`async-iterable-queue` - A library for 'Queue' class which implements AsyncIterable\<T\> works on [Node.js](https://nodejs.org/)

## CI Status

| Workflow Name | Status |
|:-:|:-:|
| **Build** | [![GitHub CI (Build)][github-build-image]][github-build-url] |
| **CodeQL** | [![GitHub CI (CodeQL)][github-codeql-image]][github-codeql-url] |
| **Coverage** | [![GitHub CI (Coverage)][github-coverage-image]][github-coverage-url] |
| **Example** | [![GitHub CI (Example)][github-example-image]][github-example-url] |

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

## License

The scripts and documentation in this project are released under the [BSD-3-Clause License](https://github.com/kei-g/async-iterable-queue/blob/main/LICENSE)

## Contributions

Contributions are welcome! See [Contributor's Guide](https://github.com/kei-g/async-iterable-queue/blob/main/CONTRIBUTING.md)

### Code of Conduct

:clap: Be nice. See [our code of conduct](https://github.com/kei-g/async-iterable-queue/blob/main/CODE_OF_CONDUCT.md)

[depencency-image]:https://img.shields.io/librariesio/release/npm/async-iterable-queue?logo=nodedotjs
[dependency-url]:https://npmjs.com/package/async-iterable-queue?activeTab=dependencies
[github-build-image]:https://github.com/kei-g/async-iterable-queue/actions/workflows/build.yml/badge.svg?branch=main
[github-build-url]:https://github.com/kei-g/async-iterable-queue/actions/workflows/build.yml?query=branch%3Amain
[github-codeql-image]:https://github.com/kei-g/async-iterable-queue/actions/workflows/codeql.yml/badge.svg?branch=main
[github-codeql-url]:https://github.com/kei-g/async-iterable-queue/actions/workflows/codeql.yml?query=branch%3Amain
[github-coverage-image]:https://github.com/kei-g/async-iterable-queue/actions/workflows/coverage.yml/badge.svg?branch=main
[github-coverage-url]:https://github.com/kei-g/async-iterable-queue/actions/workflows/coverage.yml?query=branch%3Amain
[github-example-image]:https://github.com/kei-g/async-iterable-queue/actions/workflows/example.yml/badge.svg?branch=main
[github-example-url]:https://github.com/kei-g/async-iterable-queue/actions/workflows/example.yml?query=branch%3Amain
[license-image]:https://img.shields.io/github/license/kei-g/async-iterable-queue
[license-url]:https://opensource.org/licenses/BSD-3-Clause
[maintenance-image]:https://img.shields.io/npms-io/maintenance-score/async-iterable-queue?logo=npm
[npm-image]:https://img.shields.io/npm/v/async-iterable-queue.svg?logo=npm
[npm-url]:https://npmjs.org/package/async-iterable-queue
[npmsio-url]:https://npms.io/search?q=async-iterable-queue
[quality-image]:https://img.shields.io/npms-io/quality-score/async-iterable-queue?logo=npm

# ChangeLogs

## Version 1.0.12

- :arrow_up: Packages for development are bumped
  - `@types/node` is bumped from 18.11.17 to 18.11.18
  - `@typescript-eslint/eslint-plugin` is bumped from 5.47.0 to 5.48.1
  - `@typescript-eslint/parser` is bumped from 5.47.0 to 5.48.1
  - `esbuild` is bumped from 0.16.10 to 0.17.0
  - `eslint` is bumped from 8.30.0 to 8.31.0
  - `rimraf` is bumped from 3.0.2 to 4.0.4
- :lock: Security update
  - `json5` is bumped from 2.2.0 to 2.2.3 by `npm audit fix`

## Version 1.0.11

- :green_heart: CI chore
  - A Farewell to Travis
  - CodeQL is installed
  - links on CI status badges are related specific branches
  - looser Node.js versions are specified
  - open-pull-requests-limit is increased up to 16
  - workflows are separated
- :hear_no_evil: CONTRIBUTING.md is added to .npmignore
- :arrow_up: Packages for development are bumped
  - `@types/chai` is bumped from 4.3.0 to 4.3.7
  - `@types/mocha` is bumped from 9.0.0 to 10.0.1
  - `@types/node` is bumped from 16.11.12 to 18.11.17
  - `@typescript-eslint/eslint-plugin` is bumped from 5.6.0 to 5.47.0
  - `@typescript-eslint/parser` is bumped from 5.6.0 to 5.47.0
  - `chai` is bumped from 4.3.4 to 4.3.7
  - `esbuild` is bumped from 0.14.2 to 0.16.10
  - `eslint` is bumped from 8.4.1 to 8.30.0
  - `mocha` is bumped from 9.1.3 to 10.2.0
  - `ts-node` is bumped from 10.4.0 to 10.9.1
  - `typescript` is bumped from 4.5.3 to 4.9.4
- :pencil2: Typo on README.md is fixed

## Version 1.0.10

- :wrench: 'clean' is made to be invoked after 'publish'
- :adhesive_bandage: 'lib/index.ts' is added
- :wrench: 'lint' is made to be invoked before 'build'
- :green_heart: 'paths-ignore' section is added for GitHub CI
- :memo: CONTRIBUTING.md is added
- :memo: README.md is updated
  - contributions section is added
  - license section is added
- :green_heart: Step to report code coverages is renamed

## Version 1.0.9

- :wrench: 'engines' section is added to 'package.json'
- :green_heart: Code coverage report is archived on GitHub CI
- :robot: Dependabot is installed
- :memo: GitHub Actions' canonical badge is used instead of Shields.io
- :building_construction: Migration from `terser` to `esbuild`
- :green_heart: Node.js is bumped from 16.8.0 to 16.13.1 for GitHub CI
- :arrow_up: Packages for development are bumped
  - `@types/chai` is bumped from 4.2.22 to 4.3.0
  - `@types/node` is bumped from 16.11.6 to 16.11.12
  - `@typescript-eslint/eslint-plugin` is bumped from 5.3.0 to 5.6.0
  - `@typescript-eslint/parser` is bumped from 5.3.0 to 5.6.0
  - `eslint` is bumped from 8.2.0 to 8.4.1
  - `typescript` is bumped from 4.4.4 to 4.5.3
- :wrench: URL of the repository is simplified
- :wrench: Unnecessary 'categories' section is purged from 'package.json'

## Version 1.0.8

- :package: Badge section is deleted
- :package: Email address is corrected
- :arrow_up: Packages for development are updated
  - `@types/chai` is upgraded from 4.2.21 to 4.2.22
  - `@types/node` is upgraded from 16.7.8 to 16.11.6
  - `@typescript-eslint/eslint-plugin` is upgraded from 4.30.0 to 5.3.0
  - `@typescript-eslint/parser` is upgraded from 4.30.0 to 5.3.0
  - `eslint` is upgraded from 7.32.0 to 8.2.0
  - `mocha` is upgraded from 9.1.1 to 9.1.3
  - `terser` is upgraded from 5.7.2 to 5.9.0
  - `ts-node` is upgraded from 10.2.1 to 10.4.0
  - `typescript` is upgraded from 4.4.2 to 4.4.4
- :art: Some indents are fixed

## Version 1.0.7

- :heavy_minus_sign: `uuid` is removed from development packages
- :memo: Badges are updated
- :pencil2: Fix typo of build script

## Version 1.0.6

- :memo: Badge for Travis CI is corrected
- :hammer: Build script is optimized
- :children_crossing: Example code is added
- :green_heart: Github Action for CI
- :arrow_up: Packages for development are updated
  - `@types/node` is upgraded from 16.7.1 to 16.7.8
  - `@typescript-eslint/eslint-plugin` is upgraded from 4.29.2 to 4.30.0
  - `@typescript-eslint/parser` is upgraded from 4.29.2 to 4.30.0
  - `mocha` is upgraded from 9.1.0 to 9.1.1
  - `terser` is upgraded from 5.7.1 to 5.7.2
  - `typescript` is upgraded from 4.3.5 to 4.4.2
- :memo: README is updated
  - Badges for both CI and coverage are added
  - Installation section is added
  - Usage section is added
- :green_heart: Travis CI
  - Node.js v15.x is excepted from test target
  - Only 'main' branch is made to be tested

## Version 1.0.5

- :see_no_evil: .npmignore is added
- :green_heart: .travis.yml is updated
  - Cache ~/.npm directory
  - Except release tags
- :memo: CHANGELOG.md is added
- :memo: CODE_OF_CONDUCT.md is added
- :pencil2: Typo at 'description' of 'badges' is fixed
- :hammer: package.json is updated
  - Declaration file is generated directly by `tsc`
  - Use `rimraf` instead of `rm` command
- :wrench: tsconfig.json is updated
  - Declaration file is generated to lib/ by `tsc`
  - 'typeRoots' is added
  - 'include' is added

## Version 1.0.4

- :pushpin: Node.js v14.x is supported
  - `SharedArrayBuffer` is also used with `Uint8Array`

## Version 1.0.3

- :zap: Performance Improvement
  - Call `reject` rather than throwing Error
  - Use `Atomics`
- :memo: README.md is updated
  - logo of badges are updated
- :package: package.json is updated
  - 'badges' is added

## Version 1.0.2

- :package: package.json is updated
  - 'main' is added

## Version 1.0.1

- :memo: README.md is updated
  - description is added
  - image URL of badge is fixed
- :package: package.json is updated
  - 'keywords' are added
  - 'license' is added

## Version 1.0.0

- :tada: Initial release

# ChangeLogs

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

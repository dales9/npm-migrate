# npm-migrate

Migrate all versions of a selected package from a registry to another one.

## Usage

```js

const migrate = require('npm-migrate')

const moduleName = 'my-private-module'
const from = 'http://your-old.private-registry.com:8080'
const to = 'http://nice-new.private-registry.org:8080'
const newModuleName = '@new/my-private-module' // optional

// optional
const options = {
    debug: false // default
}

migrate(moduleName, from, to, newModuleName, options)
    .then((migrated) => console.log(migrated)) // list of migrated packages
    .catch((err) => console.error(err))


```

## What it does

1. Fetches all versions (or just those not already migrated) as tarballs from old registry
2. Extracts & updates `package.json`: the `publishConfig.registry` field to the new registry url
3. Publishes each version to the new registry
4. Cleans up after itself

## Known issues

- The dates of every version published will be reset to the date and time you run this script
- The migrating user will be added as maintainer

## Changelog

- v1.2.0 - Work with scoped packages
- v1.3.0 - Compare both registries and migrate only the remaining versions not in the new registry
- v1.4.0 - Added support to update module name
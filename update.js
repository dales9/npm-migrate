const fs = require('graceful-fs')
const async = require('async')
const curry = require('lodash.curry')

const updatePackageJson = function (newRegistry, newName, folder, callback) {

    const packjson = folder + '/package.json'

    let packageJsonObject = require(packjson)
    packageJsonObject.publishConfig = { registry: newRegistry }
    packageJsonObject.name = newName

    fs.writeFile(packjson, JSON.stringify(packageJsonObject), (err) => {
        if (err) return callback(err);
        callback(null, folder)
    })
}

module.exports = function update (newRegistry, newName, folders) {

    let curried_updatePackageJson = curry(updatePackageJson)
    let series = folders.map((folder) => curried_updatePackageJson(newRegistry, newName, folder))

    return new Promise((resolve, reject) => {
        async.series(
            series,
            (err, results) => {
                if (err) return reject(err);

                resolve(results)
            })
    })
}
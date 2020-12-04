const fs = require('fs-extra')
const os = require('os')
const path = require('path')
const { zipDirectory } = require('../utils/archiverAsync')
const { workDir, srcDir } = require('.')

async function createFolders() {
  try {
    await fs.mkdir(workDir)
  } catch (e) {
    console.log(e)
  }
}

async function createAndZipFolder(name, nameRegex) {
  try {
    // Change to CWD in development
    // Change to Homedir in production
    const list = await fs.readdir(srcDir)
    const folderName = list.find((name) => name.match(nameRegex))

    if (!folderName) {
      throw {
        message: `${name} not found`,
        code: 1,
      }
    }
    // Change to CWD in development
    // Change to Homedir in production
    const pathToSrc = path.join(srcDir, folderName)
    const pathToDest = path.join(workDir, folderName + '.zip')

    await zipDirectory(pathToSrc, pathToDest)
  } catch (e) {
    if (e.code === 1) {
      throw new Error(e.message)
    }
  }
}

async function createFolderBackups() {
  try {
    Promise.all([
      createFolders(),
      createAndZipFolder('Music', new RegExp(/^musi(c|k)a?$/gi)),
      createAndZipFolder('Images', new RegExp(/^image(ne)?s?$/gi)),
      createAndZipFolder('Videos', new RegExp(/^videos?$/gi)),
      createAndZipFolder('Downloads', new RegExp(/^d(escarga|ownload)s$/gi)),
      createAndZipFolder('Documents', new RegExp(/^documento?s$/gi)),
    ])
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  createFolderBackups,
}

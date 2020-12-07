const fs = require('fs-extra')
const path = require('path')
const { zipDirectory } = require('./archiverAsync')

async function createAndZipFolder(name, nameRegex, srcDir, destDir) {
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
    const pathToDest = path.join(destDir, folderName + '.zip')

    await zipDirectory(pathToSrc, pathToDest)
  } catch (e) {
    if (e.code === 1) {
      throw new Error(e.message)
    }
  }
}

module.exports = { createAndZipFolder }

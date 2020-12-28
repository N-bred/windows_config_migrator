const fs = require('fs-extra')
const { createAndZipFolder } = require('../utils/createAndZipFolder')
const { workDir, srcDir } = require('.')

async function createFolders() {
  try {
    await fs.mkdir(workDir)
  } catch (e) {
    console.log(e)
  }
}

async function createFolderBackups() {
  try {
    await createFolders()
    await createAndZipFolder('Music', new RegExp(/^musi(c|k)a?$/gi), srcDir, workDir)
    await createAndZipFolder('Images', new RegExp(/^(pictures|imagenes)$/gi), srcDir, workDir)
    await createAndZipFolder('Videos', new RegExp(/^videos?$/gi), srcDir, workDir)
    await createAndZipFolder('Downloads', new RegExp(/^d(escarga|ownload)s$/gi), srcDir, workDir)
    await createAndZipFolder('Documents', new RegExp(/^documento?s$/gi), srcDir, workDir)
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  createFolderBackups,
}

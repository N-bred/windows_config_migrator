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
    Promise.all([
      createFolders(),
      createAndZipFolder('Music', new RegExp(/^musi(c|k)a?$/gi), srcDir, workDir),
      createAndZipFolder('Images', new RegExp(/^image(ne)?s?$/gi), srcDir, workDir),
      createAndZipFolder('Videos', new RegExp(/^videos?$/gi), srcDir, workDir),
      createAndZipFolder('Downloads', new RegExp(/^d(escarga|ownload)s$/gi), srcDir, workDir),
      createAndZipFolder('Documents', new RegExp(/^documento?s$/gi), srcDir, workDir),
    ])
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  createFolderBackups,
}

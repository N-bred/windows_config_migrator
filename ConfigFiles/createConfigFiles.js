const fs = require('fs-extra')
const path = require('path')
const { promisifiedExec } = require('../utils/promisifiedExec')
const { copyFileToFolder } = require('../utils/copyFileTofolder')
const { copyDirectory } = require('../utils/copyDirectory')

const {
  workdir,
  windowsSrcFolder,
  vsCodeFolder,
  bashFolder,
  bashUserFolder,
  calibreFolder,
  windowsFolder,
  vsCodeUserFolder,
} = require('.')

async function createFolders() {
  try {
    Promise.all([fs.mkdir(workdir), fs.mkdir(vsCodeFolder), fs.mkdir(bashFolder), fs.mkdir(calibreFolder)])
  } catch (e) {
    console.log(e)
  }
}

async function calibreFile() {
  const pathToDes = path.resolve(calibreFolder)
  try {
    await promisifiedExec('calibre-debug', ['--export-all-calibre-data', pathToDes, 'all'])
  } catch (e) {
    console.log(e)
  }
}

async function createConfigFiles() {
  try {
    Promise.all([
      createFolders(),
      copyFileToFolder(vsCodeUserFolder, vsCodeFolder, 'settings.json'),
      copyFileToFolder(bashUserFolder, bashFolder, '.bashrc'),
      calibreFile(),
      copyDirectory(windowsSrcFolder, windowsFolder),
    ])
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  createConfigFiles,
}

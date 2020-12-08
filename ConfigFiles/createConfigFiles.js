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
    await fs.mkdir(workdir)
    await fs.mkdir(vsCodeFolder)
    await fs.mkdir(bashFolder)
    await fs.mkdir(calibreFolder)
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
    await createFolders()
    await copyFileToFolder(vsCodeUserFolder, vsCodeFolder, 'settings.json')
    await copyFileToFolder(bashUserFolder, bashFolder, '.bashrc')
    await calibreFile()
    await copyDirectory(windowsSrcFolder, windowsFolder)
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  createConfigFiles,
}

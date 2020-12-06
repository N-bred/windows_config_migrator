const fs = require('fs-extra')
const path = require('path')
const { promisifiedExec } = require('../utils/promisifiedExec')
const { copyFileToFolder } = require('../utils/copyFileTofolder')
const { copyDirectory } = require('../utils/copyDirectory')

const {
  homedir,
  workdir,
  windowsSrcFolder,
  vsCodeFolder,
  bashFolder,
  calibreFolder,
  windowsFolder,
  vsCodeSrcFolder,
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
    await copyFileToFolder(vsCodeSrcFolder, vsCodeFolder, 'settings.json')
    await copyFileToFolder(homedir, bashFolder, '.bashrc')
    await calibreFile()
    await copyDirectory(windowsSrcFolder, windowsFolder)
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  createConfigFiles,
}

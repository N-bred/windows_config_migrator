const fs = require('fs-extra')
const { copyFileToFolder } = require('../utils/copyFileTofolder')
const {
  mode,
  destFolder,
  vsCodeFolder,
  bashFolder,
  calibreFolder,
  vsCodeDevDestFolder,
  bashDevDestFolder,
  calibreDevDestFolder,
} = require('.')

async function createFolders() {
  if (mode !== 'dev') return
  try {
    await fs.mkdir(destFolder)
    await fs.mkdir(vsCodeDevDestFolder)
    await fs.mkdir(bashDevDestFolder)
    await fs.mkdir(calibreDevDestFolder)
  } catch (e) {
    console.log(e)
  }
}

async function loadConfigFiles() {
  try {
    await createFolders()
    await copyFileToFolder(vsCodeFolder, vsCodeDevDestFolder, 'settings.json')
    await copyFileToFolder(bashFolder, bashDevDestFolder, '.bashrc')
    await copyFileToFolder(calibreFolder, calibreDevDestFolder, 'data')
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  loadConfigFiles,
}

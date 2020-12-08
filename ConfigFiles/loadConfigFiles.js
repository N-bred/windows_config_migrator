const fs = require('fs-extra')
const { copyFileToFolder } = require('../utils/copyFileTofolder')
const {
  mode,
  destFolder,
  vsCodeFolder,
  bashFolder,
  calibreFolder,
  vsCodeDestFolder,
  bashDestFolder,
  calibreDestFolder,
} = require('.')

async function createFolders() {
  if (mode !== 'dev') return
  try {
    await fs.mkdir(destFolder)
    await fs.mkdir(vsCodeDestFolder)
    await fs.mkdir(bashDevDestFolder)
    await fs.mkdir(calibreDevDestFolder)
  } catch (e) {
    console.log(e)
  }
}

async function loadConfigFiles() {
  try {
    await createFolders()
    await copyFileToFolder(vsCodeFolder, vsCodeDestFolder, 'settings.json')
    await copyFileToFolder(bashFolder, bashDestFolder, '.bashrc')
    await copyFileToFolder(calibreFolder, calibreDestFolder, 'data')
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  loadConfigFiles,
}

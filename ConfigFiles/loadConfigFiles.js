const fs = require('fs-extra')
const { copyFileToFolder } = require('../utils/copyFileTofolder')
const { mode, vsCodeFolder, bashFolder, calibreFolder, vsCodeDestFolder, bashDestFolder, calibreDestFolder } = require('.')

async function createFolders() {
  if (mode !== 'dev') return
  try {
    Promise.all([fs.mkdir(vsCodeDestFolder), fs.mkdir(bashDevDestFolder), fs.mkdir(calibreDevDestFolder)])
  } catch (e) {
    console.log(e)
  }
}

async function loadConfigFiles() {
  try {
    Promise.all([
      createFolders(),
      copyFileToFolder(vsCodeFolder, vsCodeDestFolder, 'settings.json'),
      copyFileToFolder(bashFolder, bashDestFolder, '.bashrc'),
      copyFileToFolder(calibreFolder, calibreDestFolder, 'data'),
    ])
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  loadConfigFiles,
}

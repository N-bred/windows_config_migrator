require('dotenv').config()
const fs = require('fs-extra')
const path = require('path')
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

async function loadAndCopyFile(srcFolder, destFolder, name, include = false) {
  try {
    const list = await fs.readdir(srcFolder)

    let fileName = ''

    if (include) {
      fileName = list.find((e) => e.includes(name))
    } else {
      fileName = list.find((e) => e === name)
    }

    const srcToFile = path.join(srcFolder, fileName)
    const destination = path.join(destFolder, fileName)

    await fs.copyFile(srcToFile, destination)
  } catch (e) {
    console.log(e)
  }
}

async function loadConfigFiles() {
  try {
    await createFolders()
    await loadAndCopyFile(vsCodeFolder, vsCodeDevDestFolder, 'settings.json')
    await loadAndCopyFile(bashFolder, bashDevDestFolder, '.bashrc')
    await loadAndCopyFile(calibreFolder, calibreDevDestFolder, 'data', true)
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  loadConfigFiles,
}

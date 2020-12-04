require('dotenv').config()
const fs = require('fs-extra')
const path = require('path')
const { homedir, workdir, vsCodeFolder, bashFolder, calibreFolder, vsCodeSrcFolder } = require('.')

async function createFolders() {
  try {
    const dest = path.join('DestFolder', 'VSCode')
    await fs.mkdir(dest)
  } catch (e) {
    console.log(e)
  }
}
async function loadVSCodeConfig() {
  try {
    const list = await fs.readdir(vsCodeFolder)

    const fileName = list.find((e) => e === 'settings.json')
    const srcToFile = path.join(vsCodeFolder, fileName)
    // const destination = path.join(vsCodeSrcFolder, fileName)
    const destination = path.join('DestFolder', 'VSCode', fileName)

    await fs.copyFile(srcToFile, destination)
  } catch (e) {
    console.log(e)
  }
}
async function loadBashConfig() {
  try {
  } catch (e) {
    console.log(e)
  }
}
async function loadCalibreConfig() {
  try {
  } catch (e) {
    console.log(e)
  }
}

async function loadConfigFiles() {
  try {
    await createFolders()
    await loadVSCodeConfig()
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  loadConfigFiles,
}

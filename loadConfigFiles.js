require('dotenv').config()
const fs = require('fs-extra')
const path = require('path')
const os = require('os')

const workdir = path.join(__dirname, process.env.DIST_FOLDER || 'dist', process.env.CONFIGURATION_FOLDER || 'Configuration')
const vsCodeFolder = path.join(workdir, process.env.VS_CODE_FOLDER || 'VSCode')
const bashFolder = path.join(workdir, process.env.BASH_FOLDER || 'bash')
const calibreFolder = path.join(workdir, process.env.CALIBRE_FOLDER || 'Calibre')

async function loadVSCodeConfig() {
  try {
    const list = await fs.readdir(vsCodeFolder)
    const fileName = list.find((e) => 'settings.json')
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
    await loadVSCodeConfig()
  } catch (e) {
    console.log(e)
  }
}

loadConfigFiles()

module.exports = {
  loadVSCodeConfig,
}

const fs = require('fs/promises')
const path = require('path')
const os = require('os')
const { promisifiedExec } = require('./promisifiedExec')
const fse = require('fs-extra')

const homedir = os.homedir()
const workdir = path.join(__dirname, process.env.DIST_FOLDER || 'dist', process.env.CONFIGURATION_FOLDER || 'Configuration')
const windowsSrcFolder = process.env.WINDOWS_SRC_FOLDER || 'W10_CONFIG'
const vsCodeFolder = path.join(workdir, process.env.VS_CODE_FOLDER || 'VSCode')
const bashFolder = path.join(workdir, process.env.BASH_FOLDER || 'bash')
const calibreFolder = path.join(workdir, process.env.CALIBRE_FOLDER || 'Calibre')
const windowsFolder = path.join(workdir, process.env.WINDOWS_FOLDER || 'Windows')

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

async function vsCodeFile() {
  const fileName = 'settings.json'
  const pathToSrc = path.join(homedir, 'AppData', 'Roaming', 'Code', 'User')
  const pathToDes = path.join(vsCodeFolder, fileName)
  const list = await fs.readdir(pathToSrc)

  if (list.indexOf(fileName) !== -1) {
    try {
      const data = await fs.readFile(path.join(pathToSrc, fileName))
      await fs.writeFile(pathToDes, data.toString())
    } catch (e) {
      console.log(e)
    }
  }
}

async function bashFile() {
  const filename = '.bashrc'
  const pathToDes = path.join(bashFolder, filename)
  const list = await fs.readdir(homedir)

  if (list.indexOf(filename) !== -1) {
    try {
      const data = await fs.readFile(path.join(homedir, filename))
      await fs.writeFile(pathToDes, data.toString())
    } catch (e) {
      console.log(e)
    }
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

async function windows10Config() {
  try {
    await fse.copy(windowsSrcFolder, windowsFolder)
  } catch (e) {
    console.log(e)
  }
}

async function createConfigFiles() {
  try {
    await Promise.all([createFolders(), vsCodeFile(), bashFile(), calibreFile(), windows10Config()])
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  createConfigFiles,
}

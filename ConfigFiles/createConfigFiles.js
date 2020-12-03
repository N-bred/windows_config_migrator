const fs = require('fs-extra')
const path = require('path')
const { promisifiedExec } = require('../utils/promisifiedExec')

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

async function vsCodeFile() {
  const fileName = 'settings.json'
  const pathToSrc = vsCodeSrcFolder
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
    await fs.copy(windowsSrcFolder, windowsFolder)
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

const fs = require('fs/promises')
const path = require('path')
const os = require('os')
const { promisifiedExec } = require('./promisifiedExec')

const homedir = os.homedir()
const workdir = 'Configuration'
const vsCodeFolder = path.join(workdir, 'VSCode')
const bashFolder = path.join(workdir, 'bash')
const calibreFolder = path.join(workdir, 'Calibre')

async function createFolders() {
  await fs.mkdir(workdir)
  await fs.mkdir(vsCodeFolder)
  await fs.mkdir(bashFolder)
  await fs.mkdir(calibreFolder)
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

async function createConfigFiles() {
  await createFolders()
  await vsCodeFile()
  await bashFile()
  await calibreFile()
}

module.exports = {
  createConfigFiles,
}

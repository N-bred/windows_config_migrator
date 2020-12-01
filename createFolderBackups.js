const fs = require('fs-extra')
const os = require('os')
const path = require('path')
const { zipDirectory } = require('./utils/archiverAsync')

const homedir = os.homedir()
const workDir = path.join(__dirname, process.env.DIST_FOLDER || 'dist', process.env.BACKUP_FOLDER || 'Backup')

async function createFolders() {
  try {
    await fs.mkdir(workDir)
  } catch (e) {
    console.log(e)
  }
}

async function createMusicBackup() {
  try {
    const list = await fs.readdir(process.cwd())
    const musicFolderName = list.find((name) => name.match(/^musi(c|k)a?$/gi))

    if (!musicFolderName) {
      throw {
        message: 'Music Folder not Found',
        code: 1,
      }
    }

    const pathToSrc = path.join(process.cwd(), musicFolderName)
    const pathToDest = path.join(workDir, musicFolderName + '.zip')
    await zipDirectory(pathToSrc, pathToDest)
  } catch (e) {
    if (e.code === 1) {
      throw new Error(e.message)
    }
  }
}

async function createFolderBackups() {
  try {
    Promise.all([createFolders(), createMusicBackup()])
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  createFolderBackups,
}

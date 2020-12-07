require('dotenv').config()
const os = require('os')
const path = require('path')

const homedir = os.homedir()
const workDir = path.join(process.env.DIST_FOLDER || 'dist', process.env.BACKUP_FOLDER || 'Backup')
const srcDir = process.env.MODE === 'dev' ? process.cwd() : homedir
const devDestFolder = process.env.DEV_DEST_FOLDER

module.exports = {
  homedir,
  workDir,
  srcDir,
  devDestFolder,
}

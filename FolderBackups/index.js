require('dotenv').config()
const os = require('os')
const path = require('path')

const homedir = os.homedir()
const workDir = path.join(__dirname, process.env.DIST_FOLDER || 'dist', process.env.BACKUP_FOLDER || 'Backup')
const srcDir = process.env.MODE === 'dev' ? process.cwd() : homedir

module.exports = {
  homedir,
  workDir,
  srcDir,
}

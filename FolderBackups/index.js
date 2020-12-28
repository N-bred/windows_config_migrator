require('dotenv').config()
const os = require('os')
const path = require('path')

const homedir = os.homedir()
const workdirDev = path.join(process.env.DIST_FOLDER || 'dist', process.env.BACKUP_FOLDER || 'Backup')
const workDir = process.env.MODE === 'dev' ? workdirDev : path.join(process.env.DRIVE, workdirDev)
const srcDir = process.env.MODE === 'dev' ? path.join(process.cwd(), 'homedirMockup') : homedir
const devDestFolder = process.env.DEV_DEST_FOLDER
const destFolder = process.env.MODE === 'dev' ? devDestFolder : homedir

module.exports = {
  homedir,
  workDir,
  srcDir,
  destFolder,
}

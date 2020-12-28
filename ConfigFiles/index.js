require('dotenv').config()
const path = require('path')
const os = require('os')

const homedir = os.homedir()
const mode = process.env.MODE
const destFolder = process.env.DEV_DEST_FOLDER
const workdirDev = path.join(process.env.DIST_FOLDER || 'dist', process.env.CONFIGURATION_FOLDER || 'Configuration')
const workdir = mode === 'dev' ? workdirDev : path.join(process.env.DRIVE, workdirDev)

const windowsSrcFolder = process.env.WINDOWS_SRC_FOLDER || 'W10_CONFIG'
const windowsFolder = path.join(workdir, process.env.WINDOWS_FOLDER || 'Windows')

const calibreFolder = path.join(workdir, process.env.CALIBRE_FOLDER || 'Calibre')
const calibreUserFolder = path.join(homedir, 'Documents', process.env.CALIBRE_DEST_FOLDER)
const calibreDevDestFolder = path.join(destFolder, 'Calibre')
const calibreDestFolder = mode === 'dev' ? calibreDevDestFolder : calibreUserFolder

const bashFolder = path.join(workdir, process.env.BASH_FOLDER || 'bash')
const bashUserFolder = homedir
const bashDevDestFolder = path.join(destFolder, 'Bash')
const bashDestFolder = mode === 'dev' ? bashDevDestFolder : bashUserFolder

const vsCodeUserFolder = path.join(homedir, 'AppData', 'Roaming', 'Code', 'User')
const vsCodeFolder = path.join(workdir, process.env.VS_CODE_FOLDER || 'VSCode')
const vsCodeDevDestFolder = path.join(destFolder, 'VSCode')
const vsCodeDestFolder = mode === 'dev' ? vsCodeDevDestFolder : vsCodeUserFolder

module.exports = {
  homedir,
  mode,
  destFolder,
  workdir,
  windowsSrcFolder,
  windowsFolder,
  calibreFolder,
  calibreUserFolder,
  calibreDestFolder,
  bashFolder,
  bashUserFolder,
  bashDestFolder,
  vsCodeUserFolder,
  vsCodeFolder,
  vsCodeDestFolder,
}

require('dotenv').config()
const path = require('path')
const os = require('os')

const homedir = os.homedir()
const mode = process.env.MODE
const destFolder = process.env.DEV_DEST_FOLDER
const workdir = path.join(process.env.DIST_FOLDER || 'dist', process.env.CONFIGURATION_FOLDER || 'Configuration')
const windowsSrcFolder = process.env.WINDOWS_SRC_FOLDER || 'W10_CONFIG'
const vsCodeFolder = path.join(workdir, process.env.VS_CODE_FOLDER || 'VSCode')
const bashFolder = path.join(workdir, process.env.BASH_FOLDER || 'bash')
const calibreFolder = path.join(workdir, process.env.CALIBRE_FOLDER || 'Calibre')
const windowsFolder = path.join(workdir, process.env.WINDOWS_FOLDER || 'Windows')
const vsCodeSrcFolder = path.join(homedir, 'AppData', 'Roaming', 'Code', 'User')
const vsCodeDevDestFolder = mode === 'dev' ? path.join(destFolder, 'VSCode') : vsCodeSrcFolder
const bashSrcFolder = homedir
const bashDevDestFolder = mode === 'dev' ? path.join(destFolder, 'Bash') : bashSrcFolder
const calibreSrcFolder = path.join(homedir, 'Documents', process.env.CALIBRE_DEST_FOLDER)
const calibreDevDestFolder = mode === 'dev' ? path.join(destFolder, 'Calibre') : calibreSrcFolder

module.exports = {
  homedir,
  mode,
  destFolder,
  workdir,
  windowsSrcFolder,
  vsCodeFolder,
  bashFolder,
  calibreFolder,
  windowsFolder,
  vsCodeSrcFolder,
  bashSrcFolder,
  calibreSrcFolder,
  vsCodeDevDestFolder,
  bashDevDestFolder,
  calibreDevDestFolder,
}

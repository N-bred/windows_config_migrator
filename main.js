const fs = require('fs/promises')
const path = require('path')
const { createConfigFiles } = require('./ConfigFiles/createConfigFiles')
const { createFolderBackups } = require('./FolderBackups/createFolderBackups')

const distDir =
  process.env.MODE === 'dev' ? process.env.DIST_FOLDER || 'dist' : path.join(process.env.DRIVE, process.env.DIST_FOLDER)

async function main() {
  try {
    await fs.mkdir(distDir)
    await createConfigFiles()
    await createFolderBackups()
  } catch (e) {
    if (e.code === 'EEXIST') {
      await fs.rmdir(distDir, { recursive: true })
      await main()
    }
  }
}

main()

const fs = require('fs/promises')
const { createConfigFiles } = require('./ConfigFiles/createConfigFiles')
const { createFolderBackups } = require('./FolderBackups/createFolderBackups')

const distDir = process.env.DIST_FOLDER || 'dist'

async function main() {
  try {
    await fs.mkdir(distDir)
    // await createConfigFiles()
    await createFolderBackups()
  } catch (e) {
    if (e.code === 'EEXIST') {
      await fs.rmdir(distDir, { recursive: true })
      await main()
    }
  }
}

main()

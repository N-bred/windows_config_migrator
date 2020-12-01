require('dotenv').config()
const { createConfigFiles } = require('./createConfigFiles')
const fs = require('fs/promises')

const distDir = process.env.DIST_FOLDER || 'dist'

async function main() {
  try {
    await fs.mkdir(distDir)
    await createConfigFiles()
  } catch (e) {
    if (e.code === 'EEXIST') {
      await fs.rmdir(distDir, { recursive: true })
      await main()
    }
  }
}

main()

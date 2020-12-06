const fs = require('fs-extra')

async function copyDirectory(srcFolder, destFolder) {
  try {
    await fs.copy(srcFolder, destFolder)
  } catch (e) {
    console.error(e)
  }
}

module.exports = { copyDirectory }

const fs = require('fs-extra')
const path = require('path')

async function copyFileToFolder(srcFolder, destFolder, name) {
  try {
    const list = await fs.readdir(srcFolder)
    const fileName = list.find((e) => e.includes(name))
    if (!fileName) throw { message: `File not Found: ${name}` }

    const srcToFile = path.join(srcFolder, fileName)
    const destination = path.join(destFolder, fileName)
    await fs.copyFile(srcToFile, destination)
  } catch (e) {
    console.error(e.message)
  }
}

module.exports = {
  copyFileToFolder,
}

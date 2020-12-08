const fs = require('fs-extra')
const path = require('path')
const { workDir, destFolder } = require('.')
const { extractZipAsync } = require('../utils/extractZipAsync')

async function loadFolderBackups() {
  try {
    const folderSrcList = await fs.readdir(workDir)
    const absoluteDestPath = path.resolve(destFolder)
    const folderDestList = await fs.readdir(absoluteDestPath)

    folderSrcList.forEach(async (folderName) => {
      const nameWithoutExt = folderName.replace('.zip', '')
      if (folderDestList.includes(nameWithoutExt)) {
        await extractZipAsync(path.join(workDir, folderName), path.join(absoluteDestPath, nameWithoutExt))
      }
    })
  } catch (e) {
    console.log(e)
  }
}

module.exports = { loadFolderBackups }

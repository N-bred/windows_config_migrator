const extract = require('extract-zip')

async function extractZipAsync(srcPath, destPath) {
  try {
    await extract(srcPath, { dir: destPath })
    console.log(`File from ${srcPath} succesfully extracted at ${destPath}`)
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  extractZipAsync,
}

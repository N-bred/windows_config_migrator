const archiver = require('archiver')
const fs = require('fs')

/**
 * @param {String} source
 * @param {String} destination
 * @returns {Promise}
 */

function zipDirectory(source, destination) {
  const archive = archiver('zip', { zlib: { level: 9 } })
  const stream = fs.createWriteStream(destination)

  return new Promise((resolve, reject) => {
    archive
      .directory(source, false)
      .on('error', (err) => reject(err))
      .pipe(stream)

    stream.on('close', () => {
      console.log(`${archive.pointer()} total bytes to ${destination}`)
      resolve()
    })

    archive.finalize()
  })
}

module.exports = { zipDirectory }

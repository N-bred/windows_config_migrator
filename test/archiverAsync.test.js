const { zipDirectory } = require('../utils/archiverAsync')
const fs = require('fs-extra')

const FOLDER_NAME = 'FolderToZip'

async function main() {
  return new Promise(async (res, rej) => {
    try {
      await zipDirectory(`./${FOLDER_NAME}`, `./${FOLDER_NAME}.zip`)
      const list = await fs.readdir('./')
      res(list)
    } catch (e) {
      if (e.code === 'EEXIST') {
        await fs.unlink(`${FOLDER_NAME}.zip`)
        await main()
      } else {
        rej(e)
      }
    }
  })
}

it('Zips directory to destination', async () => {
  expect.assertions(1)
  const list = await main()
  expect(list.toContain(`${FOLDER_NAME}.zip`))
})

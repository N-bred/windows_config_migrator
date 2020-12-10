const { copyDirectory } = require('../utils/copyDirectory')
const fs = require('fs-extra')
const src = 'FolderToZip'
const dest = 'FolderCopied'

async function main() {
  return new Promise(async (res, rej) => {
    try {
      await copyDirectory(`./${src}`, `./${dest}`)
      const list = await fs.readdir('./')
      res(list)
    } catch (e) {
      if (e.code === 'EEXIST') {
        await fs.remove(`./${dest}`)
        await main()
      } else {
        rej(e)
      }
    }
  })
}

it('Copies directory from src to dest', async () => {
  const list = await main()
  expect(list).toContain(dest)
})

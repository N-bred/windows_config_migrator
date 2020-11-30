const fs = require('fs/promises')
const path = require('path')
const os = require('os')

const homedir = os.homedir()

async function vsCodeFile() {
  const pathToSrc = path.join(homedir, 'AppData', 'Roaming', 'Code', 'User')
  const pathToDes = path.join('Configuration', 'VSCode')
  const fileName = 'settings.json'
  const list = await fs.readdir(pathToSrc)

  if (list.indexOf(fileName) !== -1) {
    try {
      const data = await fs.readFile(path.join(pathToSrc, fileName))
      await fs.writeFile(path.join(pathToDes, fileName), data.toString())
    } catch (e) {
      console.log(e)
    }
  }
}

async function main() {
  await vsCodeFile()
}

main()

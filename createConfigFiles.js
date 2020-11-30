const fs = require('fs/promises')
const path = require('path')
const os = require('os')

const homedir = os.homedir()

async function vsCodeFile() {
  const fileName = 'settings.json'
  const pathToSrc = path.join(homedir, 'AppData', 'Roaming', 'Code', 'User')
  const pathToDes = path.join('Configuration', 'VSCode', fileName)
  const list = await fs.readdir(pathToSrc)

  if (list.indexOf(fileName) !== -1) {
    try {
      const data = await fs.readFile(path.join(pathToSrc, fileName))
      await fs.writeFile(pathToDes, data.toString())
    } catch (e) {
      console.log(e)
    }
  }
}

async function bashFile() {
  const filename = '.bashrc'
  const pathToDes = path.join('Configuration', 'bash', filename)
  const list = await fs.readdir(homedir)

  if (list.indexOf(filename) !== -1) {
    try {
      const data = await fs.readFile(path.join(homedir, filename))
      await fs.writeFile(pathToDes, data.toString())
    } catch (e) {
      console.log(e)
    }
  }
}

async function main() {
  await vsCodeFile()
  await bashFile()
}

main()

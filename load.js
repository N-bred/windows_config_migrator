const { loadConfigFiles } = require('./ConfigFiles/loadConfigFiles')
const { loadFolderBackups } = require('./FolderBackups/loadFolderBackups')

async function main() {
  const argv = process.argv.slice(2)

  if (!argv.length) {
    console.error(
      'The script was executed without arguments.\ntype --files to copy the files created to the destination folder\ntype --folders to copy the created folders to the destination folder.'
    )

    return
  }

  argv.forEach(async (arg) => {
    switch (arg) {
      case '--folders':
        await loadFolderBackups()
        break
      case '--files':
        await loadConfigFiles()
        break
      default:
        console.log('No arguments passed')
        break
    }
  })
}

main()

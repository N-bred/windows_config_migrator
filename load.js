const { loadConfigFiles } = require('./ConfigFiles/loadConfigFiles')

function main() {
  const argv = process.argv.slice(2)

  if (!argv.length) {
    console.error(
      'The script was executed without arguments.\ntype --files to copy the files created to the destination folder\ntype --folders to copy the created folders to the destination folder.'
    )

    return
  }

  argv.forEach(async (arg) => {
    switch (arg) {
      case '--files':
        await loadConfigFiles()
        break
      case '--folders':
        console.log('Now FOlders')
        break
      default:
        console.log('No arguments passed')
        break
    }
  })
}

main()

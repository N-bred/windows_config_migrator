const { loadConfigFiles } = require('./ConfigFiles/loadConfigFiles')

async function main() {
  const argv = process.argv.slice(2)

  argv.forEach((arg) => {
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

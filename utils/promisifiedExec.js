const { exec } = require('child_process')

function promisifiedExec(cmd, args) {
  const cmdArgs = cmd + ' ' + args.join(' ')
  return new Promise((resolve, reject) => {
    exec(cmdArgs, (err, stdout, stderr) => {
      if (err) return reject(err)
      if (stderr) return reject(stderr)
      resolve(stdout)
    })
  })
}

module.exports = { promisifiedExec }

const { BeforeAll, setDefaultTimeout, AfterAll, Before, After } = require('cucumber');
const { spawnSync, spawn } = require('child_process');
setDefaultTimeout(30 * 1000)

BeforeAll(async function () {
  // generate pet API server
  spawnSync('java', ['-jar', 'swagger/swagger-codegen-cli.jar', 'generate',
    '-i', 'http://petstore.swagger.io/v2/swagger.json', '-l', 'nodejs-server', '-o',
    'server/petstore', '-DhideGenerationTimestamp=true,serverPort=8000'], { stdio: 'inherit' })
  await new Promise((resolve) => {
    this.petServer = spawn('npm', ['start', '--prefix', 'server/petstore']);
    this.petServer.stdout.on('data', function (data) {
      console.log(data.toString())
      if (data.toString().includes('Your server is listening')) {
        console.log('\npetServer is running!');
        resolve();
      }
    })
  })
})

AfterAll(function () {
  Object.keys(this).forEach(key => {
    if (key.includes('Server')) {
      console.log(`\nShut down ${key}`)
      this[key].kill()
    }
  })
})




const { setWorldConstructor } = require('cucumber')

function CustomWorld() {
  this.project = 'Cucumber for JS'
}

setWorldConstructor(CustomWorld)
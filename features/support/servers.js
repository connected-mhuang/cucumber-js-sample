module.exports = {
  'petServer': process.env.stage === 'DEV' ? 'http://localhost:8000/v2/':'https://production_site.com'
}
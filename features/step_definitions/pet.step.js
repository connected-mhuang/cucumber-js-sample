const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const servers = require('../support/servers')
const axios = require('axios')
const { generateRequestOptions } = require('../support/help')

Given('the request as', function (dataTable) {
  this.option = generateRequestOptions(dataTable.rowsHash())
});

When('the request is sent to {string}', async function (serverName) {
  try {
    const baseURL = servers[serverName]
    const options = { baseURL, ...this.option }
    this.response = await axios(options)
  } catch (error) {
    this.response = error.response
  }
});

Then('the response should return status {string} and response', function (status, dataTable) {
  assert.equal(this.response.status, status)
  const actualResponse = this.response.data
  const expectedResponse = dataTable.rowsHash()
  Object.keys(expectedResponse).forEach(expectedKey => {
    assert.equal(typeof actualResponse[expectedKey], expectedResponse[expectedKey])
  })
});
Then('the response should return status {string}', function (status) {
  assert.equal(this.response.status, status)
});
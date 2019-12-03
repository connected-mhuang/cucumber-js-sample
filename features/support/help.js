module.exports = {
  generateRequestOptions
}

function generateRequestOptions(data) {
  const copyData = {}
  Object.assign(copyData, data)
  if (copyData.params) {
    const params = JSON.parse(copyData.params)
    Object.keys(params).forEach(param => {
      copyData.url = copyData.url.replace(`:${param}`, params[param])
    })
    delete copyData.params
  }
  if (copyData.body) {
    copyData.data = JSON.parse(copyData.body)
  }
  return copyData
}
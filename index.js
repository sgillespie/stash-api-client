var StashClient = require('./lib/StashClient')

function stashClient (baseUrl) {
  return new StashClient(baseUrl)
}

module.exports = stashClient

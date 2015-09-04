var CoreApi = require('./lib/resources/CoreApi'),
    Project = require('./lib/resources/CoreApi'),
    Projects = require('./lib/resources/CoreApi'),
    RestClient = require('./lib/RestClient'),
    StashClient = require('./lib/StashClient')

function stashClient (baseUrl) {
  return new StashClient(baseUrl)
}

stashClient.CoreApi = CoreApi
stashClient.Project = Project
stashClient.Projects = Projects
stashClient.RestClient = RestClient
stashClient.StashClient = StashClient

module.exports = stashClient

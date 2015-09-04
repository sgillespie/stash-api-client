/**
 * Base resource module
 *
 * @module stash-client
 */
var CoreApi = require('./resources/CoreApi'),
    RestClient = require('./RestClient'),
    util = require('util')

/**
 * See {@link restClient#Request}
 *
 * @constructor
 * @param {string} baseUrl - the url of the stash instance
 */
function StashClient (baseUrl) {
  StashClient.super_.call(this, null, baseUrl)
}
util.inherits(StashClient, RestClient)

StashClient.prototype.coreApi = function () {
  return new CoreApi(this.method, this.url, this)
}

module.exports = StashClient

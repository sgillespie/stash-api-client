/**
 * Base resource module
 *
 * @module stash-client
 */
var CoreApi = require('./resources/core-api'),
    RestClient = require('./rest-client'),
    util = require('util')

/**
 * See {@link restClient#Request}
 *
 * @constructor
 * @param {string} method (optional) - the http method
 * @param {string} baseUrl - the url of the stash instance
 */
function StashClient (method, baseUrl) {
  StashClient.super_.apply(this, arguments)
}
util.inherits(StashClient, RestClient)

StashClient.prototype.coreApi = function () {
  return new CoreApi(this.method, this.url)
}

module.exports = StashClient

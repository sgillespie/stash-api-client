/**
 * The Stash Core API
 *
 * @module core-api
 */
var Projects = require('./projects'),
    RestClient = require('../rest-client'),
    util = require('util')

/**
 * See @{link RestClient}
 *
 * @constructor
 * @param {string} method (optional) - the http method
 * @param {string} baseUrl - the url of the stash instance
 */
function CoreApi (method, baseUrl) {
  CoreApi.super_.apply(this, arguments)
  this.url += '/rest/api/1.0'
}
util.inherits(CoreApi, RestClient)

CoreApi.prototype.projects = function () {
  return new Projects(this.method, this.url, this)
}

module.exports = CoreApi

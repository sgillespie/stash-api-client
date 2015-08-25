/**
 * Base resource module. It handles all http requests, and is backed by
 * superagent.
 *
 * @module rest-client
 */
var superagent = require('superagent'),
    util = require('util')

module.exports = restClient
module.exports.RestClient = RestClient

/**
 * The Stash Rest API client
 *
 * @constructor
 * @param {string} method - the http method
 * @param {string} baseUrl - the url of the stash instance
 */
function RestClient (method, baseUrl) {
  RestClient.super_.call(this, method, baseUrl)
}
util.inherits(RestClient, superagent.Request)

function restClient (method, url) {
  switch (arguments.length) {
    case 1:
      return new RestClient('GET', method)
    case 2:
      return new RestClient(method, url)
    default:
      return new RestClient('GET', 'http://localhost:7990/stash')
  }
}

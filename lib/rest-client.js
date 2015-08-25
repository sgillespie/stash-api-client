/**
 * Base resource module. It handles all http requests, and is backed by
 * superagent.
 *
 * @module rest-client
 */
var Promise = require('bluebird'),
    superagent = require('superagent'),
    wrap = require('superagent-promise'),
    util = require('util')

/**
 * The Stash Rest API client
 *
 * @constructor
 * @param {string} method - the http method
 * @param {string} baseUrl - the url of the stash instance
 */
function Request (method, baseUrl) {
  var url = baseUrl ? baseUrl : method

  Request.super_.call(this, method, url)
}
util.inherits(Request, superagent.Request)

/**
 * wrap an object with superagent-promise
 *
 * @param object {object} - the object to wrap
 * @param promise {Promise} - the promise implementation
 */
function promisify (object, promise) {
  var req = {
    Request: object,
  }

  return wrap(req, promise)
}

module.exports = promisify(Request, Promise)

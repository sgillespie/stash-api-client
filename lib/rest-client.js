/**
 * Base module. It handles all http requests, and is backed by
 * superagent.
 *
 * @module rest-client
 */
var Promise = require('bluebird'),
    superagent = require('superagent'),
    util = require('util')

/**
 * The Stash Rest API client
 *
 * @constructor
 * @param {string} method - the http method
 * @param {string} baseUrl - the url of the stash instance
 */
function RestClient (method, baseUrl) {
  var _baseUrl, _method
  switch (arguments.length) {
    case 0:
      _method = 'GET'
      _baseUrl = 'http://localhost:7990'
      break
    case 1:
      _method = 'GET'
      _baseUrl = method
      break
    default:
      _method = method
      _baseUrl = baseUrl
  }

  this.baseUrl = baseUrl
  RestClient.super_.call(this, _method, _baseUrl)
}
util.inherits(RestClient, superagent.Request)

RestClient.prototype.end = function (callback) {
  var self = this
  var end = RestClient.super_.prototype.end

  return new Promise(function (resolve, reject) {
    end.call(self, function (err, response) {
      if (callback) return callback(err, response)

      if (err) {
        reject(err)
      } else {
        resolve(response)
      }
    })
  })
}

module.exports = RestClient

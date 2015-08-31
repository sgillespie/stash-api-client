/**
 * Base module. It handles all http requests, and is backed by
 * superagent.
 *
 * @module rest-client
 */
var Promise = require('bluebird'),
    _ = require('lodash'),
    superagent = require('superagent'),
    util = require('util')

/**
 * The Stash Rest API client
 *
 * @constructor
 * @param {string} method - the http method
 * @param {string} baseUrl - the url of the stash instance
 * @param {object} parent (optional) - the parent resource
 */
function RestClient (method, baseUrl, parent) {
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
  this.headers = {}

  RestClient.super_.call(this, _method, _baseUrl)

  // Merge headers from parent
  if (parent) {
    this.headers = parent.headers

    this.on('request', function () {  // HACK - wail until later to set headers
      this.set(this.headers)
    })
  }
}
util.inherits(RestClient, superagent.Request)

RestClient.prototype.set = function (header, value) {
  var headers = {}
  if (arguments.length < 2) {
    headers = header
  } else {
    headers[header] = value
  }

  this.headers = _.merge({}, this.headers, headers)
  return RestClient.super_.prototype.set.apply(this, arguments)
}

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

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
  this.baseUrl = baseUrl
  this.headers = _.get(parent, 'headers', {})

  RestClient.super_.call(this, method, baseUrl)

  this.on('request', function () {
    this.set(this.headers)
  })
}

util.inherits(RestClient, superagent.Request)

RestClient.prototype.set = function (header, value) {
  var headers = {}

  if (value) headers[header] = value
  else headers = header

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

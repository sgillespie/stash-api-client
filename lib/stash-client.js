var Promise = require('bluebird'),
    _ = require('lodash'),
    superagent = require('superagent'),
    agent = require('superagent-promise')(superagent, Promise)

module.exports = function (options) {
  return new StashClient(options)
}

/**
 * These automatically become methods on the StashClient object
 * of the form:
 *
 * stashClient
 *   .baseUrl('http://baseurl')
 *   .secure(false)
 *   .username('username')
 *   ... etc ...
 */
var defaultOptions = {
  baseUrl: 'http://localhost:7990/stash',
  username: null,
  password: null,
  secure: false,
}

var proto = StashClient.prototype

function StashClient (options) {
  var self = this

  self._agent = agent

  self._configure(_.merge({}, defaultOptions, options))
  addChainables(self, defaultOptions)
}

proto._configure = function (/* [options,] */) {
  var self = this
  var options = Array.prototype.slice.call(arguments);

  self.options = options.reduce(function (accum, opts) {
    return _.merge(accum, opts)
  }, self.options || {})

  return self
}

proto.request = function (method, path) {
  var self = this

  self._agent = agent(method, self.options.baseUrl + path)
  return this
}

proto.delete = _.partial(proto.request, 'DELETE')
proto.get = _.partial(proto.request, 'GET')
proto.post = _.partial(proto.request, 'POST')
proto.put = _.partial(proto.request, 'PUT')

proto.execute = function () {
  return this._agent.end()
}

function addChainables (object, properties) {
  return _.reduce(properties, function (accum, val, key) {
    accum[key] = function (opt) {
      accum.options[key] = opt
      return accum
    }

    return accum
  }, object)
}

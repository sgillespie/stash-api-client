/**
 * The /projects resource
 * @module projects
 */
var RestClient = require('../rest-client'),
    util = require('util')

/**
 * See @{link RestClient}
 *
 * @constructor
 * @param {string} method (optional) - the http method
 * @param {string} baseUrl - the url of the super-resource
 */
function Projects (method, baseUrl) {
  Projects.super_.apply(this, arguments)
  this.url += '/projects'
}
util.inherits(Projects, RestClient)

Projects.prototype.createProject = function (options) {
  return new Projects('POST', this.baseUrl).send(options)
}

module.exports = Projects

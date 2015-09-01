/**
 * The /projects resource
 * @module projects
 */
var Project = require('./project'),
    RestClient = require('../rest-client'),
    util = require('util')

/**
 * See @{link RestClient}
 *
 * @constructor
 * @param {string} method (optional) - the http method
 * @param {string} baseUrl - the url of the super-resource
 * @param {object} parent (optional) - the parent resource
 */
function Projects (method, baseUrl, parent) {
  Projects.super_.call(this, method, baseUrl, parent)
  this.url += '/projects'
}
util.inherits(Projects, RestClient)

Projects.prototype.createProject = function (options) {
  return new Projects('POST', this.baseUrl, this).send(options)
}

Projects.prototype.getProjects = function (options) {
  return new Projects('GET', this.baseUrl, this).query(options)
}

Projects.prototype.project = function (projectKey) {
  return new Project(projectKey, 'GET', this.url, this)
}

module.exports = Projects

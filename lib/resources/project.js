/**
 * The /projects/{projectKey} resource
 * @module project
 */
var RestClient = require('../rest-client'),
    util = require('util')

/**
 * See @{link RestClient}
 * @constructor
 * @param {string} projectKey - The ID of the project
 * @param {string} method (optional) - the http method
 * @param {string} baseUrl - the url of the super-resource
 * @param {object} parent (optional) - the parent resource
 */
function Project (projectKey, method, baseUrl, parent) {
  Project.super_.call(this, method, baseUrl, parent)
  this.projectKey = projectKey
  this.url += '/' + projectKey
}
util.inherits(Project, RestClient)

Project.prototype.deleteProject = function () {
  return new Project(this.projectKey, 'DELETE', this.baseUrl, this)
}

Project.prototype.updateProject = function (options) {
  return new Project(this.projectKey, 'PUT', this.baseUrl, this).send(options)
}

module.exports = Project

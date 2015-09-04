var StashClient = require('../../../lib/StashClient'),
    nock = require('nock')

describe('Project', function () {
  var project = new StashClient('http://git')
        .coreApi()
        .projects()
        .project('PK-1')

  it('should append /{projectKey}', function () {
    project.url.should.equal('http://git/rest/api/1.0/projects/PK-1')
  })

  describe('deleteProject', function () {
    var mock = nock('http://git/rest/api/1.0')
          .delete('/projects/PK-1')
          .reply(204)

    it('should DELETE /projects/{projectKey}', function (done) {
      project
        .deleteProject()
        .end()
        .then(function () {
          done()
          mock.done()
        })
        .catch(done)
    })
  })

  describe('updateProject', function () {
    var opts = {
      'key': 'PK-2',
      'name': 'Cool project with a different name',
      'description': 'Description for the new cooler project',
      'avatar': 'data:image/png;base64,...',
    }

    var mock = nock('http://git/rest/api/1.0')
          .put('/projects/PK-1', opts)
          .reply(201, opts)

    it('should PUT /projects/{projectKey}', function (done) {
      project
        .updateProject(opts)
        .end()
        .then(function (data) { return JSON.parse(data.text) })
        .then(function (data) {
          data.key.should.equal(opts.key)
        })
        .then(function () {
          done()
          mock.done()
        })
        .catch(done)
    })
  })
})

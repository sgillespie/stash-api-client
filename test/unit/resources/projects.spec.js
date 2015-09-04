var StashClient = require('../../../lib/StashClient'),
    nock = require('nock')

describe('projects', function () {
  var projects = new StashClient('http://git').coreApi().projects()

  it('should append /projects', function () {
    projects.url.should.equal('http://git/rest/api/1.0/projects')
  })

  it('project should exist', function () {
    should.exist(projects.project('PK-1'))
  })

  describe('createProject', function () {
    var opts = {
      key: 'PK',
      name: 'My new project',
      description: 'This is a very cool project',
      avatar: 'data:image/png:base64:...',
    }

    var mock = nock('http://git/rest/api/1.0')
          .post('/projects', opts)
          .replyWithFile(200, __dirname + '/../data/create-project-response.json')

    it('should post to /projects', function (done) {
      new StashClient('http://git')
        .coreApi()
        .projects()
        .createProject({
          key: 'PK',
          name: 'My new project',
          description: 'This is a very cool project',
          avatar: 'data:image/png:base64:...',
        })
        .end()
        .then(function (resp) { return JSON.parse(resp.text) })
        .then(function (data) {
          data.key.should.equal(opts.key)
          data.name.should.equal(opts.name)
          data.description.should.equal(opts.description)
          data.avatar.should.equal(opts.avatar)
        })
        .then(function () {
          done()
          mock.done()
        })
        .catch(done)
    })
  })

  describe('getProjects', function () {
    var opts = {
      name: 'name',
      permision: 'perm',
    }

    var mock = nock('http://git/rest/api/1.0')
          .get('/projects')
          .query(opts)
          .replyWithFile(200, __dirname + '/../data/get-projects-response.json')

    it('should GET /projects', function (done) {
      new StashClient('http://git')
        .coreApi()
        .projects()
        .getProjects(opts)
        .end()
        .then(function (resp) { return JSON.parse(resp.text) })
        .get('values')
        .then(function (data) {
          data[0].key.should.equal('PK-1')
          data[1].key.should.equal('PK-2')
        })
        .then(function () {
          done()
          mock.done()
        })
        .catch(done)
    })
  })
})

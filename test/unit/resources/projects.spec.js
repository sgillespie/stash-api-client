var StashClient = require('../../../lib/stash-client'),
    nock = require('nock')

describe('projects', function () {
  var projects = new StashClient('http://git').coreApi().projects()

  it('should append /projects', function () {
    projects.url.should.equal('http://git/rest/api/1.0/projects')
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

    it('should create project', function (done) {
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
})

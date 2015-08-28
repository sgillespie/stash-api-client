var Projects = require('../../../lib/resources/projects'),
    StashClient = require('../../../lib/stash-client'),
    nock = require('nock')

describe('projects', function () {
  var projects = new StashClient('http://git').coreApi().projects()

  it('should append /projects', function () {
    projects.url.should.equal('http://git/rest/api/1.0/projects')
  })

  describe('createProject', function () {
    var mock = nock('http://git/rest/api/1.0')
          .post('/projects', {
            key: 'PK',
            name: 'My new project',
            description: 'This is a very cool project',
            avatar: 'data:image/png:base64:...',
          })
          .replyWithFile(201, __dirname + '../data/create-project-response.json')

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
        .then(function (data) {
          data.key.should.equal('PK')
          data.name.should.equal('My new project')
          data.description.should.equal('This is a very cool project')
          data.avatar.should.equal('data:image/png:base64:...')
        })
        .then(function () {
          done()
          mock.done()
        })
        .catch(done)
    })
  })
})

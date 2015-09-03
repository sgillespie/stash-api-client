var StashClient = require('../../lib/stash-client'),
    should = require('chai').should()

describe('Projects', function () {
  var projects = new StashClient('http://localhost:7990/stash')
        .auth('admin', 'admin')
        .coreApi()
        .projects()

  it('Can create project', function (done) {
    projects
      .createProject({
        key: 'PK',
        name: 'My new project',
        description: 'This is a very cool project',
      })
      .end()
      .get('body')
      .then(function (body) {
        body.key.should.equal('PK')
        body.name.should.equal('My new project')
        body.description.should.equal('This is a very cool project')

        should.exist(body.id)
      })
      .then(done)
      .catch(done)
  })

  it('Can get projects', function (done) {
    projects
      .getProjects()
      .end()
      .get('body')
      .get('values')
      .filter(function (value) {
        return value.key === 'PK'
      })
      .any()
      .return(null)
      .then(done)
      .catch(done)
  })

  it('Can update project', function (done) {
    projects
      .project('PK')
      .updateProject({
        key: 'PK-2',
        name: 'Different name',
        description: 'Different, cooler',
      })
      .end()
      .get('body')
      .then(function (body) {
        body.key.should.equal('PK-2')
        body.name.should.equal('Different name')
        body.description.should.equal('Different, cooler')
      })
      .return(null)
      .then(done)
      .catch(done)
  })

  it('Can delete project', function (done) {
    projects
      .project('PK-2')
      .deleteProject()
      .end()
      .return(null)
      .then(done)
      .catch(done)
  })
})

var StashClient = require('../../../lib/stash-client'),
    nock = require('nock')
    should = require('chai').should()

describe('core-api', function () {
  var core = new StashClient('http://git')
        .auth('user', 'pass')
        .coreApi()

  it('should append /rest/api/1.0', function () {
    core.url.should.equal('http://git/rest/api/1.0')
  })

  it('projects should exist', function () {
    should.exist(core.projects())
  })

  it('should carry basic auth from parent', function (done) {
    var mock = nock('http://git')
          .get('/rest/api/1.0')
          .basicAuth({
            user: 'user',
            pass: 'pass',
          })
          .reply(200)

    new StashClient('http://git')
      .auth('user', 'pass')
      .coreApi()
      .end()
      .then(function () {
        done()
        mock.done()
      })
      .catch(function (err) {
        done(err)
      })
  })
})

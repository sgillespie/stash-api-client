var nock = require('nock'),
    should = require('chai').should(),
    stashClient = require('../../lib/stash-client')

describe('stash-client', function () {
  it('should set _agent', function () {
    stashClient()._agent.should.not.be.null
  })

  it('should use default options', function () {
    var stash = stashClient()

    stash
      .options
      .baseUrl
      .should.equal('http://localhost:7990/stash')
    stash
      .options
      .secure
      .should.be.false

    should.not.exist(stash.options.username)
    should.not.exist(stash.options.password)
  })

  it('should merge options', function () {
    var opts = {
      baseUrl: 'http://git',
      username: 'user',
      password: 'password',
      secure: true,
    }

    var stash = stashClient(opts)

    stash.options.baseUrl.should.equal(opts.baseUrl)
    stash.options.secure.should.equal(opts.secure)
    stash.options.username.should.equal(opts.username)
    stash.options.password.should.equal(opts.password)
  })

  it('can chain options', function () {
    var stash = stashClient()
          .baseUrl('http://git')
          .secure(true)
          .username('username')
          .password('password')

    stash.options.baseUrl.should.equal('http://git')
    stash.options.secure.should.equal(true)
    stash.options.username.should.equal('username')
    stash.options.password.should.equal('password')
  })

  describe('request', function () {
    var mock = function () {
      return nock('http://git')
    }

    var stash = function () {
      return stashClient().baseUrl('http://git')
    }

    it('should GET baseUrl+suffix', function (done) {
      var _mock = mock(nock.get)
            .get('/somePath')
            .reply(200)

      stash()
        .get('/somePath')
        .execute()
        .then(function () {
          _mock.done()
          done()
        })
        .catch(done)
    })

    it('should POST baseURL+suffix', function (done) {
      var _mock = mock()
            .post('/somePath')
            .reply(200)

      stash()
        .post('/somePath')
        .execute()
        .then(function () {
          _mock.done()
          done()
        })
        .catch(done)
    })

    it('should DELETE baseURL+suffix', function (done) {
      var _mock = mock()
            .delete('/somePath')
            .reply(200)

      stash()
        .delete('/somePath')
        .execute()
        .then(function () {
          _mock.done()
          done()
        })
        .catch(done)
    })

    it('should PUT baseURL+suffix', function (done) {
      var _mock = mock()
            .put('/somePath')
            .reply(200)

      stash()
        .put('/somePath')
        .execute()
        .then(function () {
          _mock.done()
          done()
        })
        .catch(done)
    })
  })
})

var nock = require('nock'),
    RestClient = require('../../lib/rest-client')

require('chai').should()

describe('rest-client', function () {
  describe('restClient', function () {
    it('should construct with args', function () {
      var client = new RestClient('PUT', 'http://git')

      client.url.should.equal('http://git')
      client.method.should.equal('PUT')
    })
  })

  describe('RestClient', function () {
    it('can use callbacks', function (done) {
      var mock = nock('http://git')
        .get('/')
        .reply(200)

      new RestClient('GET', 'http://git').end(function (err, data) {
        if (err) return done(err)

        done(err, data)
        mock.done()
      })
    })

    it('can use promise', function (done) {
      var mock = nock('http://git')
        .get('/')
        .reply(200)

      new RestClient(null, 'http://git')
        .end()
        .then(function (data) {
          done(null, data)
          mock.done()
        })
        .catch(done)
    })

    it('should use basic auth', function (done) {
      var mock = nock('http://git')
            .get('/')
            .basicAuth({
              user: 'user',
              pass: 'pass',
            })
            .reply(200)

      new RestClient('GET', 'http://git')
        .auth('user', 'pass')
        .end()
        .then(function () {
          done()
          mock.done()
        })
        .catch(done)
    })
  })
})

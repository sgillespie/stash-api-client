var nock = require('nock'),
    restClient = require('../../lib/rest-client')

require('chai').should()

describe('rest-client', function () {
  describe('restClient', function () {
    it('should construct with args', function () {
      var client = restClient('PUT', 'http://git')

      client.url.should.equal('http://git')
      client.method.should.equal('PUT')
    })
  })

  describe('RestClient', function () {
    it('can use callbacks', function (done) {
      var mock = nock('http://git')
        .get('/')
        .reply(200)

      restClient('GET', 'http://git').end(function (err, data) {
        if (err) return done(err)

        done(err, data)
        mock.done()
      })
    })

    it('can use promise', function (done) {
      var mock = nock('http://git')
        .get('/')
        .reply(200)

      restClient.get('http://git')
        .end()
        .then(function (data) {
          done(null, data)
          mock.done()
        })
        .catch(done)
    })
  })
})

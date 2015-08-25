var nock = require('nock'),
    restClient = require('../../lib/rest-client')

require('chai').should()

describe('rest-client', function () {
  describe('restClient', function () {
    it('should use default method+url', function () {
      var client = restClient()

      client.url.should.equal('http://localhost:7990/stash')
      client.method.should.equal('GET')
    })

    it('should use default method', function () {
      var client = restClient('http://git')

      client.url.should.equal('http://git')
      client.method.should.equal('GET')
    })

    it('should construct with args', function () {
      var client = restClient('PUT', 'http://git')

      client.url.should.equal('http://git')
      client.method.should.equal('PUT')
    })
  })

  describe('RestClient', function () {
    it('should GET http://git', function (done) {
      nock('http://git')
        .get('/')
        .reply(200)

      restClient('GET', 'http://git').end(done)
    })
  })
})

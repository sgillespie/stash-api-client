var stashApiClient = require('../../index.js'),
    should = require('chai').should()

describe('stash-api-client', function () {
  var stash = stashApiClient('http://git')

  it('should construct StashClient', function () {
    stash.url.should.equal('http://git')
    should.exist(stash.coreApi())
  })
})

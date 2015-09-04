var stashApiClient = require('../../index.js'),
    should = require('chai').should()

describe('stash-api-client', function () {
  var stash = stashApiClient('http://git')

  it('should construct StashClient', function () {
    stash.url.should.equal('http://git')
    should.exist(stash.coreApi())
  })

  it('RestClient should exist', function () {
    should.exist(new stashApiClient.RestClient())
  })

  it('StashClient should exist', function () {
    should.exist(new stashApiClient.StashClient())
  })

  it('CoreApi should exist', function () {
    should.exist(new stashApiClient.CoreApi())
  })

  it('Project should exist', function () {
    should.exist(new stashApiClient.Project())
  })

  it('Projects should exist', function () {
    should.exist(new stashApiClient.Projects())
  })
})

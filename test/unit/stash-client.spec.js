var should = require('chai').should(),
    RestClient = require('../../lib/rest-client'),
    StashClient = require('../../lib/stash-client')

require('chai').should

describe('stash-client', function () {
  it('should extend superagent', function () {
    StashClient.super_.should.equal(RestClient)
  })

  it('coreApi should exist', function () {
    should.exist(new StashClient().coreApi())
  })
})

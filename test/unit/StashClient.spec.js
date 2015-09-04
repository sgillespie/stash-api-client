var should = require('chai').should(),
    RestClient = require('../../lib/RestClient'),
    StashClient = require('../../lib/StashClient')

require('chai').should

describe('StashClient', function () {
  it('should extend superagent', function () {
    StashClient.super_.should.equal(RestClient)
  })

  it('coreApi should exist', function () {
    should.exist(new StashClient().coreApi())
  })
})

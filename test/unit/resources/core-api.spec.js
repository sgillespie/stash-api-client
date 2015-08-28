var StashClient = require('../../../lib/stash-client'),
    should = require('chai').should()

describe('core-api', function () {
  var core = new StashClient('http://git').coreApi()

  it('should append /rest/api/1.0', function () {
    core.url.should.equal('http://git/rest/api/1.0')
  })

  it('projects should exist', function () {
    should.exist(core.projects())
  })
})

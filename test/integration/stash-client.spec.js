var config = require('./integration-test.config.js'),
    stashClient = require('../../lib/stash-client.js')

require('chai').should()

describe('stash-client', function () {
  it('should GET /application-properties', function (done) {
    stashClient()
      .baseUrl(config.stashUrl)
      .get('/rest/api/1.0/application-properties')
      .execute()
      .get('body')
      .then(function (body) {
        body.displayName.should.equal('Stash')
        done()
      })
      .catch(done)
  })

  it('should POST /projects', function (done) {
    stashClient()
      .baseUrl(config.stashUrl)
      .username('admin')
      .password('admin')
      .post('/rest/api/1.0/projects')
      .send({
        'key': 'PK',
        'name': 'Project Key',
      })
      .execute()
      .get('body')
      .then(function (body) {
        body.key.should.equal('PK')
        done()
      })
      .catch(done)
  })

  it('should PUT /projects/PK', function (done) {
    stashClient()
      .baseUrl(config.stashUrl)
      .username('admin')
      .password('admin')
      .put('/rest/api/1.0/projects/PK')
      .send({ 'key': 'PK1' })
      .execute()
      .get('body')
      .then(function (body) {
        body.key.should.equal('PK1')
        done()
      })
      .catch(done)
  })

  it('should DELETE /projects/PK', function (done) {
    stashClient()
      .baseUrl(config.stashUrl)
      .username('admin')
      .password('admin')
      .delete('/rest/api/1.0/projects/PK1')
      .execute()
      .then(function () {
        done()
      })
      .catch(done)
  })
})

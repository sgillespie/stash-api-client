# stash-api-client

[![Build Status](https://travis-ci.org/sgillespie/stash-api-client.svg?branch=master)](https://travis-ci.org/sgillespie/stash-api-client)
[![Coverage Status](https://coveralls.io/repos/sgillespie/stash-api-client/badge.svg?branch=master&service=github)](https://coveralls.io/github/sgillespie/stash-api-client?branch=master)

A rest client for Atlassian Stash

# Example

    var stash = require('stash-api-client')
    stash
      .auth('admin', 'admin')
      .coreApi()
      .projects()
      .createProject({
        key: 'PK',
        name: 'My new project',
        description: 'This is a new project'
      })
      .end()

# Installation

    npm install [-g] git://github.com/sgillespie/stash-api-client

# Running Tests

Unit tests are written in mocha and chai:

    npm test

Integration tests require a running Stash instance. By default, integration tests
assume Stash is running at http://localhost:7990/stash. Override this in
`test/integration/integration-test.config.js`.

    npm run-script integration-test

Or, you can run all tests in one go

    npm run-script test-all

# License

The MIT License (MIT)

Copyright (c) 2015 Sean Gillespie

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


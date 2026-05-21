'use strict'

const { describe, it } = require('node:test')
const assert = require('node:assert/strict')
const Stream = require('stream')
const context = require('../../test-helpers/context')

describe('ctx.origin', () => {
  it('should return the origin of url', () => {
    const socket = new Stream.Duplex()
    const req = {
      url: '/users/1?next=/dashboard',
      headers: {
        host: 'localhost'
      },
      socket,
      __proto__: Stream.Readable.prototype
    }
    const ctx = context(req)
    assert.strictEqual(ctx.origin, 'http://localhost')

    // change it also work
    ctx.url = '/foo/users/1?next=/dashboard'
    assert.strictEqual(ctx.origin, 'http://localhost')
  })

  it('should not use the Origin header', () => {
    const ctx = context({
      url: '/users/1',
      headers: {
        host: 'localhost',
        origin: 'http://example.com'
      }
    })

    assert.strictEqual(ctx.origin, 'http://localhost')
  })
})

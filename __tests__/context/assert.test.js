'use strict'

const { describe, it } = require('node:test')
const context = require('../../test-helpers/context')
const assert = require('node:assert/strict')
const Koa = require('../..')

describe('ctx.assert(value, status)', () => {
  it('should throw an error', () => {
    const ctx = context()

    let assertionRan = false
    try {
      ctx.assert(false, 404, 'custom message')
      throw new Error('should not reach here')
    } catch (err) {
      assertionRan = true
      assert.strictEqual(err.status, 404)
      assert.strictEqual(err.message, 'custom message')
      assert.strictEqual(err.expose, true)
    }
    assert(assertionRan)
  })

  it('should throw Koa HttpError instances', () => {
    const ctx = context()

    assert.throws(() => {
      ctx.assert(false, 404, 'custom message')
    }, err => {
      assert.strictEqual(err instanceof Koa.HttpError, true)
      assert.strictEqual(err.status, 404)
      assert.strictEqual(err.message, 'custom message')
      assert.strictEqual(err.expose, true)
      return true
    })
  })

  it('should throw Koa HttpError instances from assertion helpers', () => {
    const ctx = context()

    assert.throws(() => {
      ctx.assert.equal('actual', 'expected', 400, 'custom message')
    }, err => {
      assert.strictEqual(err instanceof Koa.HttpError, true)
      assert.strictEqual(err.status, 400)
      assert.strictEqual(err.message, 'custom message')
      assert.strictEqual(err.expose, true)
      return true
    })
  })
})

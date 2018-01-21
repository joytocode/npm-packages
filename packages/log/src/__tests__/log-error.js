import VError from 'verror'
import logError from '../log-error'

global.console.error = jest.fn()

describe('logError', () => {
  it('should log error with info', () => {
    const info = { env: 'test' }
    logError(new VError({ info }, 'Oops'))
    expect(global.console.error.mock.calls.length).toBe(2)
    expect(global.console.error.mock.calls[0]).toEqual(['Error Info', info])
  })
  it('should log error without info', () => {
    logError(new Error('Oops'))
    expect(global.console.error.mock.calls.length).toBe(1)
  })
})

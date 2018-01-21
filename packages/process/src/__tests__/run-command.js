import runCommand from '../run-command'

describe('runCommand', () => {
  it('should run command with arguments', async () => {
    await expect(runCommand('echo', ['hello'])).resolves.toBe(0)
  })
})

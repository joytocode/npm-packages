import monorepo from '..'

describe('monorepo', () => {
  it('should handle command run', async () => {
    try {
      await monorepo(['run', 'lint'])
    } catch (err) {
      console.log(err)
    }
  })
})

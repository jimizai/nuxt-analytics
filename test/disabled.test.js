const { setup, loadConfig, get } = require('@nuxtjs/module-test-utils')

describe('disabled', () => {
  let nuxt, addTemplate

  beforeAll(async () => {
    const beforeNuxtReady = nuxt => {
      addTemplate = nuxt.moduleContainer.addTemplate = jest.fn(nuxt.moduleContainer.addTemplate)
    }
    ;({ nuxt } = await setup(loadConfig(__dirname, 'dev'), { beforeNuxtReady }))
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('render', async () => {
    const html = await get('/')
    expect(html).toContain('Works!')
  })
})

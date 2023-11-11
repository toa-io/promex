import { Promex } from './Promex'
import JestMatchersShape = jest.JestMatchersShape

it('should be', async () => {
  expect(Promex).toBeDefined()
})

it.each(
  ['resolve', 'reject'] as Array<'resolve' | 'reject'>
)('should %s', async (action) => {
  const promex = new Promex()

  setImmediate(() => {
    promex[action]('ok')
  })


  const expectation = action + 's' as keyof JestMatchersShape

  await expect(promex)[expectation].toBe('ok')
})

it('should resolve using callback', async () => {
  function resolve(callback: (err: any, result: any) => void) {
    callback(null, 'ok')
  }

  const promex = new Promex()

  setImmediate(() => {
    resolve(promex.callback)
  })

  await expect(promex).resolves.toBe('ok')
})

it('should reject using callback', async () => {
  function reject(callback: (err: any, result?: any) => void) {
    callback('oh')
  }

  const promex = new Promex()

  setImmediate(() => {
    reject(promex.callback)
  })

  await expect(promex).rejects.toBe('oh')
})

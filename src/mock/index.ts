import { rest, setupWorker } from 'msw'
const restHandlers = [
  rest.post('/login/:username/:pwd', (req, res, ctx) => {
    console.log(req.params, 'req')

    const { username, pwd } = req.params
    if (username === 'admin' && pwd === '123') {
      return res(
        ctx.status(200),
        ctx.body(
          JSON.stringify({
            token: 'token_123456789',
            username: 'admin',
            msg: 'login success!',
          })
        )
      )
    }
    return res(
      ctx.status(401),
      ctx.body(
        JSON.stringify({
          msg: 'login failed!',
        })
      )
    )
  }),
]

const defaultHandlers: never[] = []

export const mocker = setupWorker(...restHandlers, ...defaultHandlers)

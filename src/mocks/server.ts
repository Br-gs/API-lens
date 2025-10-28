import { setupServer } from 'msw/node'
import { handlers } from './handlers'
import { handlersApi } from './handlersApi'

export const server = setupServer(...handlersApi, ...handlers)

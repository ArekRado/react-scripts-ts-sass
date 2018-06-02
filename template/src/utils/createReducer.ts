import { Reducer } from 'redux'
import { store } from './store'

interface Handlers<State> {
  [key: string]: (state: State, action: any) => any
}

type CreateReducer = <T>(name: string, defaultState: T, handlers: Handlers<T>) => Reducer<T>

export const createReducer: CreateReducer = (name, defaultState, handlers) => {
  const reducer = (state = defaultState, action = { type: '' }) => {
    const handler = handlers[action.type]
    if (handler) {
      const result = handler(state, action)
      return Array.isArray(state)
        ? result
        : Object.assign({}, state, result) // https://github.com/Microsoft/TypeScript/pull/13288
    }
    return state
  }

  store.injectReducer(name, reducer)

  return reducer
}

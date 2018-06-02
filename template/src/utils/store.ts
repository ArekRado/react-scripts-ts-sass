import createHistory from 'history/createBrowserHistory'
import { routerMiddleware, routerReducer as routing } from 'react-router-redux'
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore as reduxCreateStore,
  Reducer,
  ReducersMapObject, Store as ReduxStore,
} from 'redux'
import { reducer as form } from 'redux-form'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import thunk from 'redux-thunk'
import { BehaviorSubject } from 'rxjs'
import {State} from '../types'

export interface Store extends ReduxStore<State> {
  makeRootReducer: (asyncReducers: ReducersMapObject) => Reducer<any>,
  asyncReducers: ReducersMapObject,
  asyncEpics: any,
  injectReducer: (key: string, reducer: Reducer<any>) => void,
  injectEpic: any,
}

const injectEpic: any = new BehaviorSubject(combineEpics())
const rootEpic: any = (action$: any, epicStore: any) => injectEpic.mergeMap((epic: any): any => epic(action$, epicStore))
const epicMiddleware = createEpicMiddleware(rootEpic)

export const history = createHistory()

const enhancers = []

const middleware = applyMiddleware(
  thunk,
  routerMiddleware(history),
  epicMiddleware,
)

const makeRootReducer = (asyncReducers = {}) => combineReducers({
  ...asyncReducers,
  form,
  routing,
})

if (process.env.NODE_ENV === 'development') {
  const w = window as any
  const devToolsExtension = w.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const rootReducer = makeRootReducer()
const composedEnhancers = compose(middleware, ...enhancers)

export const store: Store = {
  ...reduxCreateStore(rootReducer, {}, composedEnhancers),
  makeRootReducer,
  asyncReducers: {},
  asyncEpics: {},
  injectReducer: (key, reducer) => {
    if (!store.asyncReducers[key]) {
      store.asyncReducers[key] = reducer
      store.replaceReducer(store.makeRootReducer(store.asyncReducers))
    } else {
      console.warn(`Reducer ${name} has been injected`)
    }
  },
  injectEpic,
}

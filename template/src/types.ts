import { RouterState } from 'react-router-redux'
import { Dispatch } from 'redux'

import { InitialState as ApiInitialState } from './components/App/redux/api.reducer'

// Reducers are async so they may not exist before use
export interface State {
  routing?: RouterState
  api?: ApiInitialState
  form?: {
    // example: FormReducer
  }
}

type ReduxThunk = (dispatch: Dispatch<any>, getState: () => State) => void
export interface ActionPayload<P> {
  type: string
  payload: P
}

export type Action<P = {}> = () => ActionPayload<P>
export type ActionP<P = {}, D = {}> = (data: D) => ActionPayload<P>

export type ThunkAction = () => ReduxThunk
export type ThunkActionP<D = {}> = (data: D) => ReduxThunk

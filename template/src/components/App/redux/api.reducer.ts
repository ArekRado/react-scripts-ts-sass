import { ActionP, ActionPayload, State } from 'types'
import { createReducer } from 'utils/createReducer'
import { mapActionToAjaxRequest } from 'utils/request'
import { store } from 'utils/store'
import { Epic } from 'redux-observable'
import { ajax } from 'rxjs/observable/dom/ajax'
import { Observable } from 'rxjs'

// ------------------------------------
// Utils
// ------------------------------------
export type ApiActionRequest<Payload = {}, ErrorPayload = {}> = {
  url: string
  id: string
  data: Payload
  defaultPayload: Payload
  defaultErrorPayload: ErrorPayload
  method?: string
  cancelOnRemove?: boolean
  cancelOnDuplicate?: boolean,
}

export type ApiActionResponse<Payload = {}> = {
  id: string
  payload: Payload
  status: number,
}

export type Response<Payload, ErrorPayload = {}> = {
  id: string
  url: string
  method: string
  cancelOnRemove: boolean
  cancelOnDuplicate: boolean
  isFetching: boolean
  isPristine: boolean
  success: boolean
  error: boolean
  errorPayload: ErrorPayload
  payload: Payload,
}
export const emptyResponse: Response<object, object> = {
  id: '',
  url: '',
  method: 'GET',
  cancelOnRemove: true,
  cancelOnDuplicate: true,
  isFetching: false,
  isPristine: true,
  success: false,
  error: false,
  errorPayload: {},
  payload: {},
}

export const mapResponse = (state: InitialState, id: string, data: any) =>
  state.map(
    response =>
      response.id === id
        ? {
            ...response,
            ...data,
          }
        : response,
  )

// ------------------------------------
// Constants
// ------------------------------------
export const REMOVE = 'api.REMOVE'
export const FETCH_ATTEMPT = 'api.FETCH_ATTEMPT'
export const FETCH_SUCCESS = 'api.FETCH_SUCCESS'
export const FETCH_FAILURE = 'api.FETCH_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
export const remove: ActionP<string, string> = payload => ({
  type: REMOVE,
  payload,
})

export const fetchAttempt: ActionP<ApiActionRequest, ApiActionRequest> = payload => ({
  type: FETCH_ATTEMPT,
  payload,
})

export const fetchSuccess: ActionP<ApiActionResponse, ApiActionResponse> = payload => ({
  type: FETCH_SUCCESS,
  payload,
})

export const fetchFailure: ActionP<ApiActionResponse, ApiActionResponse> = payload => ({
  type: FETCH_FAILURE,
  payload,
})

// ------------------------------------
// Epics
// ------------------------------------
export const observeFetch: Epic<
  ActionPayload<ApiActionRequest>,
  State,
  {},
  ActionPayload<ApiActionResponse> | any // ;(
> = (action$, store) =>
  action$.ofType(FETCH_ATTEMPT).mergeMap(action =>
    ajax(mapActionToAjaxRequest(action, store.getState()))
      .map<any, ActionPayload<ApiActionResponse>>(ajaxResponse =>
        fetchSuccess({
          id: action.payload.id,
          status: ajaxResponse.status,
          payload: ajaxResponse.response,
        }),
      )
      .catch(error => {
        console.log(error)

        return Observable.of(
          fetchFailure({
            id: action.payload.id,
            status: error.status,
            payload: error.response,
          }),
        )
      })
      .takeUntil(
        action$.filter(
          nextAction =>
            (nextAction.type === FETCH_ATTEMPT && action.payload.cancelOnDuplicate) ||
            (nextAction.type === REMOVE && action.payload.cancelOnRemove) ||
            action.payload.id === nextAction.payload.id,
        ),
      ),
  )

store.injectEpic.next(observeFetch)

// ------------------------------------
// Reducer
// ------------------------------------
export type InitialState = Array<Response<any>>
export const initialState = []

createReducer('api', initialState, {
  [REMOVE]: (state: InitialState, id) => state.filter(response => response.id === id),
  [FETCH_ATTEMPT]: (state: InitialState, { payload }: ActionPayload<ApiActionRequest<any>>) =>
    state.find(api => api.id === payload.id)
      ? mapResponse(state, payload.id, {
          isFetching: true,
          isPristine: false,
          success: false,
          error: false,
        })
      : state.concat([
          {
            ...emptyResponse,
            url: payload.url,
            id: payload.id,
            method: payload.method || emptyResponse.method,
            cancelOnRemove: payload.cancelOnRemove || emptyResponse.cancelOnRemove,
            cancelOnDuplicate: payload.cancelOnDuplicate || emptyResponse.cancelOnDuplicate,
            payload: payload.defaultPayload,
          },
        ]),
  [FETCH_SUCCESS]: (state: InitialState, { payload }: ActionPayload<ApiActionResponse>) => {
    console.log(payload)

    return mapResponse(state, payload.id, {
      payload: payload.payload,
      isFetching: false,
      success: true,
      error: false,
    })
  },

  [FETCH_FAILURE]: (state: InitialState, { payload }: ActionPayload<ApiActionResponse>) =>
    mapResponse(state, payload.id, {
      payload: payload.payload,
      isFetching: false,
      success: false,
      error: true,
    }),
})

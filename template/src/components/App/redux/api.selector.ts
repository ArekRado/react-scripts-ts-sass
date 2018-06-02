import { State } from 'types'
import { createSelector } from 'reselect'
import { initialState, emptyResponse } from './api.reducer'

export const api = (state: State) => state.api || initialState

export const requestPayload = createSelector(
  api,
  responses => responses.find(response => response.id === 'xd') || emptyResponse,
)

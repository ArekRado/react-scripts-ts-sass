import { emptyResponse, fetchAttempt, remove, Response } from 'components/App/redux/api.reducer'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { isEmpty } from 'ramda'
import { State } from '../types'

export type ApiProps<Payload> = {
  data: Response<Payload>,
}

export type ApiDispatchProps = {
  fetch: (requestBody: any) => void
  remove: () => void,
}

const findPayload = <Payload>(id: string, defaultPayload: Payload) => (
  state: State,
): Response<Payload> => {
  const response = state.api
    ? state.api.find(payload => payload.id === id) || emptyResponse
    : emptyResponse

  return {
    ...response,
    payload: isEmpty(response.payload) ? defaultPayload : response.payload,
  }
}

type WithApiParams<Payload, Props, DefaultErrorPayload> = {
  url: (props: Props) => string
  id: string
  method: string
  defaultPayload: Payload
  cancelOnRemove: boolean
  cancelOnDuplicate: boolean
  defaultErrorPayload: DefaultErrorPayload,
}
export const withApi = <Payload, Props, DefaultErrorPayload>({
  url,
  id,
  method,
  defaultPayload,
  cancelOnRemove,
  cancelOnDuplicate,
  defaultErrorPayload,
}: WithApiParams<Payload, Props, DefaultErrorPayload>) =>
  connect<ApiProps<Payload>, ApiDispatchProps, Props, State>(
    state => ({
      data: findPayload<Payload>(id, defaultPayload)(state),
    }),
    (dispatch, ownProps) =>
      bindActionCreators(
        {
          fetch: data =>
            fetchAttempt({
              url: url(ownProps),
              id,
              data,
              method,
              cancelOnDuplicate,
              cancelOnRemove,
              defaultPayload,
              defaultErrorPayload,
            }),
          remove: () => remove(id),
        },
        dispatch,
      ),
  )

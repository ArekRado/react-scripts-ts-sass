import { compose, lifecycle } from 'recompose'
import { ApiDispatchProps, ApiProps, withApi } from './withApi.hoc'

export type WithFetchProps<Payload> = ApiProps<Payload> & ApiDispatchProps

type WithFetchParams<Payload, Props, DefaultErrorPayload = null> = {
  url: (props: Props) => string
  id?: string
  method?: string
  loadOnMount?: boolean
  removeOnUnmount?: boolean
  loadOnProps?: (nextProps: Props, props: Props) => boolean
  removeOnProps?: (nextProps: Props, props: Props) => boolean
  getRequestData?: (props: Props) => any
  defaultPayload: Payload
  defaultErrorPayload?: DefaultErrorPayload
  cancelOnDuplicate?: boolean
  cancelOnRemove?: boolean,
}
export const withFetch = <Payload, Props, DefaultErrorPayload = undefined>({
  url,
  method = 'GET',
  id = Math.random().toString(),
  loadOnMount = false,
  removeOnUnmount = true,
  loadOnProps = (x, y) => false,
  removeOnProps = (x, y) => false,
  getRequestData = () => null,
  defaultPayload,
  defaultErrorPayload,
  cancelOnDuplicate = true,
  cancelOnRemove = true,
}: WithFetchParams<Payload, Props, DefaultErrorPayload>) =>
  compose<ApiProps<Payload>, {}>(
    withApi<Payload, Props, undefined | DefaultErrorPayload>({
      url,
      id,
      method,
      defaultPayload,
      cancelOnDuplicate,
      cancelOnRemove,
      defaultErrorPayload: defaultErrorPayload,
    }),
    lifecycle<WithFetchProps<Payload> & Props, {}>({
      componentDidMount() {
        loadOnMount && this.props.fetch(getRequestData(this.props))
      },
      componentWillUnmount() {
        removeOnUnmount && this.props.remove()
      },
      componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
          if (loadOnProps(nextProps, this.props)) {
            this.props.fetch(getRequestData(this.props))
          }
          if (removeOnProps(nextProps, this.props)) {
            this.props.remove()
          }
        }
      },
    }),
  )

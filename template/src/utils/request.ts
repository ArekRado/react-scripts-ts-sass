import * as qs from 'qs'
import { AjaxRequest } from 'rxjs'
import { State, ActionPayload } from 'types'
import { ApiActionRequest } from 'components/App/redux/api.reducer'
import { config } from './config'

export enum ContentTypesEnum {
  PLAIN = 0,
  JSON = 1,
  FORM_DATA = 2,
}

export const contentTypes = {
  PLAIN: 0,
  JSON: 1,
  FORM_DATA: 2,
  // TODO multipart/form-data
}

const prepareUrl = (url: string, query: object) => {
  let fixedUrl = url.search('//') > -1 ? config.baseUrl : `${config.baseUrl}${url}`
  const queryString = qs.stringify(query)
  if (queryString) {
    fixedUrl = `${fixedUrl}?${queryString}`
  }
  return fixedUrl
}

const prepareHeaders = (contentType: ContentTypesEnum): HeadersInit => {
  // const { token, tokenType } = getCredentials()
  const headers = new Headers()

  // headers.append('Authorization', `${tokenType} ${token}`)
  headers.append('Accept', 'application/json, application/xml, text/plain, text/html, *.*')

  contentTypes.PLAIN === contentType && headers.append('Content-Type', 'text/plain')
  contentTypes.JSON === contentType && headers.append('Content-Type', 'application/json')
  contentTypes.FORM_DATA === contentType &&
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8')

  return headers
}

const prepareBody = (data: any, contentType: ContentTypesEnum): string => {
  if (data === '') {
    return ''
  }

  switch (contentType) {
    case contentTypes.JSON:
      return JSON.stringify(data)
    case contentTypes.FORM_DATA:
      // const searchParams = new URLSearchParams()
      // Object.keys(data).forEach((key) => {
      //   searchParams.append(key, data[key])
      // })
      // return searchParams.toString()
      return data // TODO
    // TODO multipart/form-data
    default:
      return data
  }
}

export interface RequestParams extends AjaxRequest {
  method: string
  url?: string
  data?: any
  contentType?: ContentTypesEnum
  credentials?: RequestCredentials
  mode?: RequestMode
  baseUrl?: string
  customHeaders?: HeadersInit
}

export type Request = (action: ActionPayload<ApiActionRequest>, state: State) => AjaxRequest
export const mapActionToAjaxRequest: Request = (action, state) => {
  const method = action.payload.method || 'GET'

  return {
    url: prepareUrl(action.payload.url, method === 'GET' ? action.payload.data : {}),
    method: method,
    headers: prepareHeaders(contentTypes.JSON),
    data: method === 'GET' ? undefined : prepareBody(action.payload, contentTypes.JSON),
  }
}

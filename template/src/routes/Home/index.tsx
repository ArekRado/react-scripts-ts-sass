import * as React from 'react'
import { Map } from 'react-loadable'

export const prefetch = () =>
  import(/* webpackChunkName: "Route Home" */ './components/Home.component')

export const Home = Map({
  loader: {
    HomeModule: prefetch,
  },
  loading: () => null,
  render: ({ HomeModule }: any, props) => <HomeModule.Home {...props} />,
})

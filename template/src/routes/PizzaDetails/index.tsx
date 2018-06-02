import * as React from 'react'
import { Map } from 'react-loadable'

export const prefetch = () =>
  import(/* webpackChunkName: "Route PizzaDetails" */ './components/PizzaDetails.component')

export const PizzaDetails = Map({
  loader: {
    PizzaDetailsModule: prefetch,
  },
  loading: () => null,
  render: ({ PizzaDetailsModule }: any, props) => <PizzaDetailsModule.PizzaDetails {...props} />,
})

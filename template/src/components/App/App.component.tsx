import { DefaultLayout } from 'components/DefaultLayout'
import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { Home } from 'routes/Home'
import { PizzaDetails } from 'routes/PizzaDetails'
import { history } from 'utils/store'
import { HOME, PIZZA_DETAILS } from 'utils/url'
import './app.scss'

export const App: React.StatelessComponent = () => (
  <ConnectedRouter history={history}>
    <DefaultLayout>
      <Switch>
        <Route exact={true} component={Home} path={HOME} />
        <Route exact={true} component={PizzaDetails} path={PIZZA_DETAILS} />
      </Switch>
    </DefaultLayout>
  </ConnectedRouter>
)

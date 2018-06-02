import { App } from 'components/App'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from 'utils/store'
import { register as registerServiceWorker } from './utils/registerServiceWorker'

export const root = document.getElementById('root')

if (root) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    root,
  )
} else {
  console.error('Element with id #root doesn\'t exist')
}

if (process.env.CONFIG_ENV !== 'production') {
  console.log(
    `%c 🚧 7pizzas :D ${process.env.RELEASE} 🚧 %c\nConfig: ${process.env.CONFIG_ENV} \nEnv: ${
      process.env.NODE_ENV
    }`,
    'color: hotpink; font-family: "Comic Sans MS", "Comic Sans", cursive; font-size: 40px',
    '',
  )
}

registerServiceWorker()

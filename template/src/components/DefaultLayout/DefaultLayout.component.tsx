import * as React from 'react'
import s from './defaultLayout.scss'
import pizza from './pizza.svg'

export const DefaultLayout: React.StatelessComponent = ({ children }) =>
  <div>
    <header className={s.header}>
      <img src={pizza} className={s.logo} alt='logo' />
      <h1 className={s.title}>Welcome to 7pizzas</h1>
    </header>
    
    <div className={s.content}>
      {children}
    </div>
  </div>

import * as React from 'react'
import { Link } from 'react-router-dom'
import { home } from 'utils/url'
import s from './pizzaDetails.scss'

export const PizzaDetailsSkeleton: React.StatelessComponent = () => (
  <div className={s.container}>
    <div className={s.image} />
    <div className={s.content}>
      <div>
        <span className={s.h3} /> <span className={s.adjective} />
        <div className={s.priceLabel}>
          <span className={s.price} />
        </div>
        <div className={s.ingredients} />
        <div className={s.description} />
      </div>

      <div>
        <Link to={home({ page: 0 })} className={s.goBackButton}>
          Back to Home
        </Link>
      </div>
    </div>
  </div>
)

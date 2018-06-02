import { Pizza } from 'components/App/types'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { pure } from 'recompose'
import { pizzaDetails } from 'utils/url'
import s from './card.scss'

const CardComponent: React.StatelessComponent<Pizza> = ({
  id,
  image,
  name,
  price,
}) =>
  <div className={s.pizza}>
    <img className={s.image} src={image} alt='pizza' />
    <div className={s.h3}>{name}</div>
    <div className={s.priceLabel}>
      Price: <span className={s.price}>{price}</span>
    </div>
    <Link to={pizzaDetails({ id })} className={s.moreLink}>More</Link>
  </div>

export const Card = pure(CardComponent)


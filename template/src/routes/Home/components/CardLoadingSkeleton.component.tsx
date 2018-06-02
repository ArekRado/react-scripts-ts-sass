import * as cn from 'classnames'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { pure } from 'recompose'
import s from './card.scss'

const CardLoadingSkeletonComponent: React.StatelessComponent = () => (
  <div className={s.pizza}>
    <div className={s.image} />
    <div className={s.h3} />
    <div className={s.priceLabel} />
    <Link to='' className={cn(s.moreLink, s.disabledMoreLink)}>
      More
    </Link>
  </div>
)

export const CardLoadingSkeleton = pure(CardLoadingSkeletonComponent)

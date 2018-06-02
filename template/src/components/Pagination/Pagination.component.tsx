import * as React from 'react'
import { range } from 'ramda'
import * as cn from 'classnames'
import { Link } from 'react-router-dom'
import s from './pagination.scss'

type PaginationProps = {
  total: number
  perPage: number
  page: number
  url: (params: any) => string,
}
export const Pagination: React.StatelessComponent<PaginationProps> = ({
  total,
  perPage,
  page,
  url,
}) => (
  <div className={s.container}>
    {range(0, total / perPage).map(i => (
      <Link key={i} className={cn(s.button, page === i && s.active)} to={url(i)}>
        {i}
      </Link>
    ))}
  </div>
)

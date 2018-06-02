import { Pizza } from 'components/App/types'
import * as React from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { compose } from 'recompose'
import { ApiProps } from 'utils/withApi.hoc'
import { withFetch } from 'utils/withFetch.hoc'
import { home } from 'utils/url'
import s from './pizzaDetails.scss'
import { PizzaDetailsSkeleton } from './PizzaDetailsSkeleton.component'

const emptyPizza: Pizza = {
  id: '',
  name: '',
  adjective: '',
  price: 0,
  ingredients: [],
  image: '',
  description: '',
}

type PizzaDetailsProps<A> = ApiProps<A> & RouteComponentProps<{ id: string }>
const PizzaDetailsComponent: React.StatelessComponent<PizzaDetailsProps<Pizza>> = ({
  data: { isFetching, payload },
}) =>
  isFetching ? (
    <PizzaDetailsSkeleton />
  ) : (
    <div className={s.container}>
      <img className={s.image} src={payload.image} alt='pizza' />
      <div className={s.content}>
        <div>
          <span className={s.h3}>{payload.name}</span>{' '}
          <span className={s.adjective}>({payload.adjective})</span>
          <div className={s.priceLabel}>
            Price:
            <span className={s.price}>{payload.price}</span>
          </div>
          <div className={s.ingredients}>
            {isFetching && <div className={s.redSkeleton} />}
            {payload.ingredients.map(ingredient => (
              <span key={ingredient} className={s.ingredient}>
                {ingredient}
              </span>
            ))}
          </div>
          <div className={s.description}>{payload.description}</div>
        </div>

        <div>
          <Link to={home({ page: 0 })} className={s.goBackButton}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )

const withApiFetch = withFetch<Pizza, PizzaDetailsProps<Pizza>>({
  url: props => `/pizzas/${props.match.params.id}`,
  loadOnMount: true,
  defaultPayload: emptyPizza,
})

export const PizzaDetails = compose(withApiFetch)(PizzaDetailsComponent)

import { Pizza } from 'components/App/types'
import { range } from 'ramda'
import * as React from 'react'
import { compose, withHandlers } from 'recompose'
import { withFetch, WithFetchProps } from 'utils/withFetch.hoc'
import { RouteComponentProps } from 'react-router-dom'
import { formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { Card } from './Card.component'
import { CardLoadingSkeleton } from './CardLoadingSkeleton.component'
import s from './home.scss'
import { Search } from './Search.component'
import { Pagination } from 'components/Pagination'
import { home } from 'utils/url'
import { PathFunction } from 'path-to-regexp'
import { State } from 'types'

const searchForm = formValueSelector('search')

export const emptyPizzas = range(0, 12).map(i => ({
  id: `${i}`,
  name: '',
  adjective: '',
  price: 0,
  ingredients: [],
  image: '',
  description: '',
}))

const withConnect = connect<{}, State>(state => ({
  searchText: searchForm(state, 'text'),
}))

const withApiFetch = withFetch<{ data: Pizza[]; total: number }, HomeComponentProps, {}>({
  id: 'pizzas',
  url: () => '/pizzas',
  loadOnMount: true,
  defaultPayload: {
    data: emptyPizzas,
    total: 0,
  },
  getRequestData: props => ({
    page: props.match.params.page,
    searchText: props.searchText,
  }),
  loadOnProps: (nextPros, props) =>
    nextPros.match.params.page !== props.match.params.page ||
    nextPros.searchText !== props.searchText,
})

type Handlers = {
  getPage: PathFunction,
}
const handlers = withHandlers<HomeComponentProps, Handlers>({
  getPage: props => page => home({ page }),
})

type HomeComponentProps = RouteComponentProps<{ page: string }> &
  WithFetchProps<{ data: Pizza[]; total: number }> &
  Handlers & { searchText: string }
const HomeComponent: React.StatelessComponent<HomeComponentProps> = ({ data, match, getPage }) => (
  <div className={s.container}>
    <Search />
    {/* {console.log(data.payload)} */}
    {data.isFetching
      ? data.payload.data.map(pizza => <CardLoadingSkeleton key={pizza.id} />)
      : data.payload.data.map(pizza => (
          <Card
            key={pizza.id}
            id={pizza.id}
            image={pizza.image}
            name={pizza.name}
            price={pizza.price}
            adjective={pizza.adjective}
            description={pizza.description}
            ingredients={pizza.ingredients}
          />
        ))}

    <Pagination
      total={data.payload.total}
      page={parseInt(match.params.page, 10)}
      perPage={12}
      url={getPage}
    />
  </div>
)

export const Home = compose(withApiFetch, handlers, withConnect)(HomeComponent)

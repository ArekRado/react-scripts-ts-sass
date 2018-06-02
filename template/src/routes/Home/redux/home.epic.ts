import { State } from 'types'
import { actionTypes, FormAction } from 'redux-form'
import { store } from 'utils/store'
import { Epic } from 'redux-observable'
import { fetchAttempt } from 'components/App/redux/api.reducer'
import { Observable } from 'rxjs'
import { emptyPizzas } from '../components/Home.component'

// ------------------------------------
// Epics
// ------------------------------------
export const observeSearch: Epic<FormAction, State> = action$ =>
  action$
    .filter(
      nextAction =>
        nextAction.type === actionTypes.CHANGE &&
        nextAction.meta.form === 'search' &&
        nextAction.meta.field === 'text',
    )
    .mergeMap(action =>
      Observable.of(
        fetchAttempt({
          url: '/search',
          id: 'pizzas',
          data: {
            text: action.payload,
          },
          defaultErrorPayload: {},
          defaultPayload: {
            data: emptyPizzas,
            total: 0,
          },
        }),
      ),
    )

store.injectEpic.next(observeSearch)

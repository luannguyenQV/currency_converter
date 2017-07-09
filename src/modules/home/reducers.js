import { handleActions } from 'redux-actions'
import { loadCurrencyExchange } from './actions'

const defaultState = {
  foreignExchange: {}
}

/**
 * Handler actions
 */
const handlers = {
  [loadCurrencyExchange]: (state, action) => ({...state,
    ...{foreignExchange: action.payload}
  })
}

export default handleActions(handlers, defaultState)

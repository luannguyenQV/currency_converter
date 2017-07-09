import { connect } from 'react-redux'
import { loadCurrencyExchange } from '../actions'
import Home from '../components/Home'

/**
 * 1. Load currency async from http://api.fixer.io/
 */
const mapDispatchToProps = dispatch => ({
  loadCurrency: async (currency) => {
    try {
      let response = await fetch(`http://api.fixer.io/latest?base=${currency}`)
      let responseJson = await response.json()
      dispatch(loadCurrencyExchange(responseJson))
      return responseJson
    } catch(error) {
      console.log(error)
    }
  }
})

/**
 * Get state from redux as props for Home Page
 */
const mapStateToProps = state => ({
  foreignExchange: state['home'].foreignExchange
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

import React, { Component } from 'react'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import { listCurrency } from '../../../common/utils/default'
import '../home.css'

export default class Home extends Component {
  constructor (props) {
    super(props)

    this.state = ({
      startingCurrency: 'USD',
      targetCurrency: 'EUR',
      startingMoney: 0,
      targetMoney: 0
    })
  }

  async componentWillMount() {
    const { loadCurrency } = this.props
    const foreignExchange = await loadCurrency('USD')
    const { rates } = foreignExchange

    if (rates) {
      this.setState({
        startingMoney: 1,
        targetMoney: rates['EUR']
      })
    }
  }

  _onSelectStarting = async (payload) => {
    const { targetCurrency, startingMoney } = this.state
    const { loadCurrency } = this.props
    const foreignExchange = await loadCurrency(payload)
    const { rates } = foreignExchange
    
    if (rates) {
      const targetMoney = parseFloat(startingMoney, 10) * parseFloat(rates[targetCurrency], 10) || 0
      this.setState({
        startingCurrency: payload,
        targetMoney: targetMoney
      })
    }
  }
  
  _onSelectTarget = (payload) => {
    const { foreignExchange: {rates} } = this.props
    const { startingMoney } = this.state

    if (rates) {
      const targetMoney = parseFloat(startingMoney, 10) * parseFloat(rates[payload], 10) || 0
      this.setState({
        targetCurrency: payload,
        targetMoney: targetMoney
      })
    }
  }

  _handleChange = e => {
    const { targetCurrency, startingMoney } = this.state
    const { foreignExchange: {rates} } = this.props
    
    const newStartingMoney = (e.target.validity.valid) ? e.target.value : startingMoney
    const targetMoney = parseFloat(newStartingMoney, 10) * parseFloat(rates[targetCurrency], 10) || 0

    if (rates) {
      this.setState({
        startingMoney: newStartingMoney,
        targetMoney: targetMoney
      })
    }
  }

  render() {
    const { foreignExchange: {rates} } = this.props
    const { 
      startingCurrency, 
      targetCurrency, 
      startingMoney,
      targetMoney
    } = this.state
    const listTargetCurrency = listCurrency.filter(cur => cur !== startingCurrency)

    return (
      <div className='main'>
        <div className='header'>
          <h1>Currency Converter</h1>
        </div>
        <section>
          <div className='input-section'>
            <TextField
              name='inputMoney'
              type='text'
              placeholder='0'
              autoFocus='true'
              value={startingMoney}
              pattern="^\d+(.\d+)?$"
              inputStyle={{ textAlign: 'center', fontSize: '20px' }}
              onChange={(e) => this._handleChange(e)}
            />
            <div className='target-money'>{targetMoney.toLocaleString('en-US', { minimumFractionDigits: 4 })}</div>
          </div>
          <div className='input-section'>
            <SelectField
              floatingLabelText='Starting Currency'
              onChange={(event, key, payload) => this._onSelectStarting(payload)}
              value={startingCurrency}
              maxHeight={300}
            >
              {rates && listCurrency.map((rate, index) => 
                <MenuItem key={index} value={rate} primaryText={rate} />
              )}
            </SelectField>
            <SelectField
              floatingLabelText='Target Currency'
              onChange={(event, key, payload) => this._onSelectTarget(payload)}
              value={targetCurrency}
              maxHeight={300}
            >
              {rates && listTargetCurrency.map((rate, index) => 
                <MenuItem key={index} value={rate} primaryText={rate} />
              )}
            </SelectField>
          </div>
        </section>
      </div>
    )
  }
}

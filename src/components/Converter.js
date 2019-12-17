import React, { useState } from 'react'
import CurrencySelect from './CurrencySelect'

const Converter = ({ currenciesList, dataService }) => {
  const [fromCurrency, setFromCurrency] = useState('EUR')
  const [toCurrency, setToCurrency] = useState('CZK')
  const [fromAmount, setFromAmount] = useState(0)
  const [toAmount, setToAmount] = useState(0)

  const handleFromChange = (event) => {
    setFromCurrency(event.target.value)
  }
  const handleToChange = (event) => {
    setToCurrency(event.target.value)
  }
  const handleAmount = (event) => {
    setFromAmount(event.target.value)
    setToAmount('')
  }
  const handleSubmit = (event) => {
    let newTransfer = {
      fromCurrency,
      toCurrency,
      fromAmount
    }
    dataService
      .convert(newTransfer)
      .then(response => {
        console.log("handleSubmit convert response: ", response)
        setToAmount(response.amountTo)
        setFromAmount(response.amountFrom)
      }).catch(error => {
        console.log("handleSubmit convert error: ", error)
      })
      event.preventDefault()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="line">
          <label className="col75">
            <input value={fromAmount} type="number" onChange={handleAmount}/>
          </label>
          <label className="col25">
            <CurrencySelect selected={fromCurrency} handler={handleFromChange} currencies={currenciesList} />
          </label>
        </div>
        <div className="line">
          <label className="col75">
            <input value={toAmount} type="number" readOnly/>
          </label>
          <label className="col25">
            <CurrencySelect selected={toCurrency} handler={handleToChange} currencies={currenciesList} />
          </label>
        </div>
        <div className="line">
          <label className="col25">
            <input type="submit" value="Transfer"/>
          </label>
        </div>
      </form>
    </div>
  )
}

export default Converter
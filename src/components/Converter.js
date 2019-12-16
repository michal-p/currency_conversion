import React, { useState } from 'react'
import CurrencySelect from './CurrencySelect'

const Converter = ({ currencies }) => {
  console.log("Converter currencies: ", currencies)
  const [fromCurrency, setFromCurrency] = useState({})
  const [toCurrency, setToCurrency] = useState({})

  const handleFromChange = (event) => {
    setFromCurrency(event.target.value)
  }
  const handleToChange = (event) => {
    setToCurrency(event.target.value)
  }

  return (
    <div>
      <form onSubmit={() => console.log('submit')}>
        <div className="line">
          <label className="col75">
            <input name="amountFrom" type="number"/>
          </label>
          <label className="col25">
            <CurrencySelect selected={fromCurrency} handler={handleFromChange} currencies={currencies} />
          </label>
        </div>
        <div className="line">
          <label className="col75">
            <input name="amountTo" type="number"/>
          </label>
          <label className="col25">
            <CurrencySelect selected={toCurrency} handler={handleToChange} currencies={currencies} />
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
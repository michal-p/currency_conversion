import React from 'react'
import CurrencySelect from './CurrencySelect'

const Converter = ({ currenciesList, conversion, query, handleSubmit, handleAmount, handleFromChange, handleToChange }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="line">
          <label className="col75">
            <input value={query.amountFrom} type="number" onChange={handleAmount}/>
          </label>
          <label className="col25">
            <CurrencySelect selected={conversion.currencyFrom} handler={handleFromChange} currencies={currenciesList} />
          </label>
        </div>
        <div className="line">
          <label className="col75">
            <input className="read" value={conversion.amountTo} type="number" readOnly/>
          </label>
          <label className="col25">
            <CurrencySelect selected={conversion.currencyTo} handler={handleToChange} currencies={currenciesList} />
          </label>
        </div>
      </form>
    </div>
  )
}

export default Converter
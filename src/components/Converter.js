import React, { useState } from 'react'
import CurrencySelect from './CurrencySelect'

const Converter = ({ currenciesList, dataService }) => {
  const [conversion, setConversion] = useState({
    currencyFrom: 'EUR',
    amountFrom: 0,
    currencyTo: 'CZK',
    amountTo: 0
  })

  const handleFromChange = (event) => {
    setConversion({...conversion, currencyFrom: event.target.value})
  }
  const handleToChange = (event) => {
    setConversion({...conversion, currencyTo: event.target.value})
  }
  const handleAmount = (event) => {
    setConversion({...conversion, amountFrom: event.target.value, amountTo: ''})
  }
  const handleSubmit = (event) => {
    let newTransfer = {
      fromCurrency: conversion.currencyFrom,
      toCurrency: conversion.currencyTo,
      fromAmount: conversion.amountFrom
    }
    dataService
      .convert(newTransfer)
      .then(response => {
        console.log("handleSubmit convert response: ", response)
        setConversion({
          currencyFrom: response.currencyFrom,
          amountFrom: response.amountFrom,
          currencyTo: response.currencyTo,
          amountTo: response.amountTo
        })
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
            <input value={conversion.amountFrom} type="number" onChange={handleAmount}/>
          </label>
          <label className="col25">
            <CurrencySelect selected={conversion.currencyFrom} handler={handleFromChange} currencies={currenciesList} />
          </label>
        </div>
        <div className="line">
          <label className="col75">
            <input value={conversion.amountTo} type="number" readOnly/>
          </label>
          <label className="col25">
            <CurrencySelect selected={conversion.currencyTo} handler={handleToChange} currencies={currenciesList} />
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
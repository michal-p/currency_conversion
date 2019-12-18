import React, { useState, useEffect } from 'react'
import './App.css'
import dataServices from './services/data'
import Converter from './components/Converter'
import Statistics from './components/Statistics'
import Footer from './components/Footer'

function App() {
  const [ currenciesList, setCurrenciesList ] = useState({})
  const [ statistics, setStatistics ] = useState({})
  const [ conversion, setConversion ] = useState({
    currencyFrom: 'HUF',
    amountFrom: 0,
    currencyTo: 'EUR',
    amountTo: 0
  })

  const getStatistics = () => {
    dataServices
      .getStatistics()
      .then(response => {
        console.log("effect getStatistics service response: ", response)
        setStatistics(response)
      }).catch(error => {
        console.log("effect getStatistics service error: ", error)
      })
  }

  useEffect(() => {
    dataServices
      .getCurrencies()
      .then(response => {
        console.log("effect getCurrencies service response: ", response)
        setCurrenciesList(response)
      }).catch(error => {
        console.log("effect getCurrencies service error: ", error)
      })
  }, [])

  useEffect(() => {
    getStatistics()
  }, [])

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
    dataServices
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
    getStatistics()
    event.preventDefault()
  }

  return (
    <div className="App">
      <header className="App-header">
        Currency conversion HEADER
      </header>
      <main>
        <section>
          <h1>Converter</h1>
          <Converter currenciesList={currenciesList} conversion={conversion} handleSubmit={handleSubmit} handleAmount={handleAmount} handleFromChange={handleFromChange} handleToChange={handleToChange} />
        </section>
        <section className="statistics">
          <h1>Statistics</h1>
          <Statistics stats={statistics}/>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App

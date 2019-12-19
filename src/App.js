import React, { useState, useEffect } from 'react'
import './App.css'
import dataServices from './services/data'
import Converter from './components/Converter'
import Statistics from './components/Statistics'
import Footer from './components/Footer'
import Notification from './components/Notification'

function App() {
  const [ currenciesList, setCurrenciesList ] = useState({})
  const [ statistics, setStatistics ] = useState({})
  const [ conversion, setConversion ] = useState({
    currencyFrom: 'HUF',
    amountFrom: 0,
    currencyTo: 'EUR',
    amountTo: 0
  })
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [ type, setType ] = useState('note')

  const showHideNotification = (message, type) => {
    setNotificationMessage(message)
    setType(type)
    setTimeout(() => setNotificationMessage(null), 5000)
  }

  const getStatistics = () => {
    dataServices
      .getStatistics()
      .then(response => setStatistics(response))
      .catch(error => showHideNotification(`effect getStatistics service error: ${error}`, 'error'))
  }

  useEffect(() => {
    dataServices
      .getCurrencies()
      .then(response => setCurrenciesList(response))
      .catch(error => showHideNotification(`effect getCurrencies service error: ${error}`, 'error'))
  }, [])

  useEffect(() => getStatistics(), [])

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
        setConversion({
          currencyFrom: response.currencyFrom,
          amountFrom: response.amountFrom,
          currencyTo: response.currencyTo,
          amountTo: response.amountTo
        })
        showHideNotification(`Saved to transfer to db: ${ JSON.stringify(conversion) }`, 'note')
        getStatistics()
      })
      .catch(error => showHideNotification(`effect convert service error: ${error}`, 'error'))
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
      <Notification message={notificationMessage} type={type}/>
      <Footer />
    </div>
  )
}

export default App

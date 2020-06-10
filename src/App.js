import React, { useState, useEffect, useCallback } from 'react'
import './App.css'
import dataServices from './services/data'
import Converter from './components/Converter'
import Statistics from './components/Statistics'
import Footer from './components/Footer'
import Notification from './components/Notification'

function App() {
  const [currenciesList, setCurrenciesList] = useState({})
  const [statistics, setStatistics] = useState({})
  const [conversion, setConversion] = useState({
    currencyFrom: 'CZK',
    amountFrom: 1,
    currencyTo: 'EUR',
    amountTo: 0,
  })
  const [query, setQuery] = useState({amountFrom: 1})
  const [notificationMessage, setNotificationMessage] = useState('')
  const [type, setType] = useState('note')

  const showHideNotification = (message, type) => {
    setNotificationMessage(message)
    setType(type)
    setTimeout(() => setNotificationMessage(''), 5000)
  }

  const getStatistics = useCallback(
    () => {
      dataServices
        .getStatistics()
        .then((response) => setStatistics(response))
        .catch((error) =>
          showHideNotification(
            `effect getStatistics service error: ${error}`,
            'error'
          )
        )
    }, []
  )

  const getCurrencies = useCallback(
    () => {
      dataServices
        .getCurrencies()
        .then((response) => setCurrenciesList(response))
        .catch((error) =>
          showHideNotification(
            `effect getCurrencies service error: ${error}`,
            'error'
          )
        )
    }, []
  )

  const handleSubmit = useCallback(
    (newConversion = conversion, event) => {
      let newTransfer = {
        fromCurrency: newConversion.currencyFrom,
        toCurrency: newConversion.currencyTo,
        fromAmount: newConversion.amountFrom,
      }
      dataServices
        .convert(newTransfer)
        .then((response) => {
          setConversion({
            currencyFrom: response.currencyFrom,
            amountFrom: response.amountFrom,
            currencyTo: response.currencyTo,
            amountTo: response.amountTo,
          })
          showHideNotification(
            `Saved to transfer to db: ${JSON.stringify(conversion)}`,
            'note'
          )
          getStatistics()
        })
        .catch((error) =>
          showHideNotification(`effect convert service error: ${error}`, 'error')
        )
      if (event) {
        event.preventDefault()
      }
    },[conversion, getStatistics]
  )

  useEffect(() => {
    getCurrencies()
    getStatistics()
    handleSubmit()
  }, [getCurrencies, getStatistics])

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSubmit({ ...conversion, ...query})
    }, 800);
    return () => {
      clearTimeout(timer)
    }
  }, [query])

  const handleFromChange = (event) => {
    handleSubmit({ ...conversion, currencyFrom: event.target.value })
  }
  const handleToChange = (event) => {
    handleSubmit({ ...conversion, currencyTo: event.target.value })
  }
  const handleAmount = (event) => {
    setQuery({amountFrom: event.target.value})
  }

  return (
    <div className="App">
      <header className="App-header">Currency conversion HEADER</header>
      <main>
        <section>
          <h1>Converter</h1>
          <Converter
            currenciesList={currenciesList}
            conversion={conversion}
            query={query}
            handleSubmit={handleSubmit}
            handleAmount={handleAmount}
            handleFromChange={handleFromChange}
            handleToChange={handleToChange}
          />
        </section>
        <section className="statistics">
          <h1>Statistics</h1>
          <Statistics stats={statistics} />
        </section>
      </main>
      <Notification message={notificationMessage} type={type} />
      <Footer />
    </div>
  )
}

export default App

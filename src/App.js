import React, { useState, useEffect } from 'react'
import './App.css'
import dataServices from './services/data'
import Converter from './components/Converter'
import Statistics from './components/Statistics'
import Footer from './components/Footer'

function App() {
  const [ currenciesList, setCurrenciesList ] = useState({})
  const [ statistics, setStatistics ] = useState({})

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
    dataServices
      .getStatistics()
      .then(response => {
        console.log("effect getStatistics service response: ", response)
        setStatistics(response)
      }).catch(error => {
        console.log("effect getStatistics service error: ", error)
      })
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        Currency conversion HEADER
      </header>
      <main>
        <section>
          <h1>Converter</h1>
          <Converter currenciesList={currenciesList} dataService={dataServices}/>
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

import React, { useState, useEffect } from 'react'
import './App.css'
import dataService from './services/data'
import Converter from './components/Converter'
import Statistics from './components/Statistics'
import Footer from './components/Footer'

function App() {
  const [ currenciesList, setCurrenciesList ] = useState({})
  // const [ currenciesLatest, setCurrenciesLatest ] = useState({})

  useEffect(() => {
    dataService
      .getCurrencies()
      .then(response => {
        console.log("effect data service respond: ", response)
        setCurrenciesList(response)
      }).catch(error => {
        console.log("effect data service error: ", error)
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
          <Converter currenciesList={currenciesList} dataService={dataService}/>
        </section>
        <section className="statistics">
          <h1>Statistics</h1>
          <Statistics />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App

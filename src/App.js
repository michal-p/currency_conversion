import React from 'react'
import './App.css'
import './components/Converter'
import './components/Footer'
import Converter from './components/Converter'
import Statistics from './components/Statistics'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Currency conversion HEADER
      </header>
      <main>
        <section>
          <h1>Converter</h1>
          <Converter />
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

import { useState } from 'react'
import './../css/App.css'
import Header from './../components/Header'
import Footer from './../components/Footer'
import Feed from './../components/Feed'

function App() {
  return (
    <div className="App">
      <Header />
      <Feed />
      <Footer />
    </div>
  )
}

export default App

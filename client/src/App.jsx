import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Signup} from './routes/Routes'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<Signup/>} />
      </Routes>
    </Router>
  )
}

export default App

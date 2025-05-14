import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import SpeciesForm from './components/SpeciesForm'
import { Signup,Login, Dashboard } from './routes/Routes'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/' element={<SpeciesForm/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </Router>
  )
}

export default App

import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import HomePage from '../HomePage'
import RecommendPage from '../RecommendPage'
import LoginPage from '../LoginPage'
import SignupPage from '../SignupPage'
import './style.css'
import { getData } from '../../utils/api'

function App() {
  return (
  <>
    <div className="navBar">
      <h1>LoL Challenge</h1>
      <a href='/recommend'>Recommend</a>
      <a href='/'>Home</a>
      <a href='/login'>Login</a>
      <a href='/signup'>Signup</a>
    </div>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recommend" element={<RecommendPage getData={getData} />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
    </Routes>
  </>
  );
}

export default App;
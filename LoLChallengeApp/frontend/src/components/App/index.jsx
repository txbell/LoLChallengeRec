import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import HomePage from '../HomePage'
import RecommendPage from '../RecommendPage'
import './style.css'
import { getData } from '../../utils/api'

function App() {
  return (
  <>
    <div className="navBar">
      <h1>LoL Challenge</h1>
      <a href='/recommend'>Recommend</a>
      <a href='/'>Home</a>
    </div>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recommend" element={<RecommendPage getData={getData} />} />
    </Routes>
  </>
  );
}

export default App;
import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import HomePage from '../HomePage'
import RecommendPage from '../RecommendPage'
import LoginPage from '../LoginPage'
import UserPage from '../UserPage'
import './style.css'
import { getData } from '../../utils/api'

function App() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [puuid, setPuuid] = useState();
  const [gameName, setGameName] = useState();
  const [tagLine, setTagLine] = useState();

  useEffect(() => {
    setTagLine('NA1')
  }, [])

  return (
  <>
    <div className="navBar">
      <h1>LoL Challenge</h1>
      <a className='link' href='/recommend'>Recommend</a>
      <a className='link' href='/'>Home</a>
      <Link to="/auth/signup">
        <h4 className="px-3 py-2 hover:text-white link">Sign Up</h4>
      </Link>
      <Link to="/auth/login">
        <h4 className="px-3 py-2 hover:text-white link">Log In</h4>
      </Link>
      <Link to="/user">
        <h4 className="px-3 py-2 hover:text-white link">User</h4>
      </Link>
    </div>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recommend" element={<RecommendPage getData={getData} puuid={puuid} setPuuid={setPuuid} tagLine={tagLine} setTagLine={setTagLine} gameName={gameName} setGameName={setGameName} />} />
      <Route path='/auth/login' element={<LoginPage locc='login' setEmail={setEmail} setPassword={setPassword} />} />
      <Route path='/auth/signup' element={<LoginPage locc='signup' setEmail={setEmail} setPassword={setPassword} />} />
      <Route path='/user' element={<UserPage email={email} password={password} setPuuid={setPuuid} puuid={puuid} gameName={gameName} setGameName={setGameName} tagLine={tagLine} setTagLine={setTagLine} />} />
    </Routes>
  </>
  );
}

export default App;
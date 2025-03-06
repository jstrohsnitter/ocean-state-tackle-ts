import { useState } from 'react'
import Freshwater from './components/Fish/Freshwater';
import Pelagic from './components/Fish/Pelagic';
import Saltwater from './components/Fish/Saltwater';
import BlockIsland from './components/Locations/BlockIsland';
import LowerNarragansettBay from './components/Locations/LowerNarragansettBay';
import MidNarragansettBay from './components/Locations/MidNarragansettBay';
import Offshore from './components/Locations/Offshore';
import Providence from './components/Locations/Providence';
import SouthShore from './components/Locations/SouthShore';
import UpperNarragansettBay from './components/Locations/UpperNarragansettBay';
import Bait from './components/Bait';
import Blog from './components/Blog';
import Brands from './components/Brands';
import Charters from './components/Charters';
import FishingReport from './components/FishingReport';
import Lures from './components/Brands';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm' // import the SignupForm
import SigninForm from './components/SigninForm/SigninForm'
import * as authService from '../src/services/authService'
import NavBar from './components/NavBar';
import Home from './components/Home';
import './App.css'
import { Route, Routes } from 'react-router';


const App = () => {

  const [user, setUser] = useState<unknown>(authService.getUser())

  const handleSignout = () => {
      authService.signout()
      setUser(null)
    }

  return (
    <>
    <NavBar user={user} handleSignout={handleSignout}/>
    <Routes>
    { user ? (
          <Route path="/" element={<Dashboard user={user} />} />
        ) : (
          <Route path="/" element={<Home />} />
        )}
         <Route path='/signup' element={<SignupForm setUser={setUser} />} /> 
         <Route path='/signin' element={<SigninForm setUser={setUser} />} />
      <Route path="/" element={<Home/>}/>
      <Route path="/species/freshwater" element={<Freshwater/>}/>
      <Route path="/areas/blockisland" element={<BlockIsland/>}/>
    </Routes>
    </>
    )
};

export default App;

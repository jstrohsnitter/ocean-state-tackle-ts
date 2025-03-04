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
import NavBar from './components/NavBar';
import Home from './components/Home';
import './App.css'
import { Route, Routes } from 'react-router';

const App = () => {
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/species/freshwater" element={<Freshwater/>}/>
      <Route path="/areas/blockisland" element={<BlockIsland/>}/>
    </Routes>
    </>
    )
};

export default App;

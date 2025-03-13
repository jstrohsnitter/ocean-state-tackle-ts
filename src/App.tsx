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
import * as blogService from './services/blogservices'

const App = () => {

  // const fetchData = async () => {
  //   const data = await blogService.show();
  //   console.log('Data:', data);
  // }

  return (
    <>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/fishingreport" element={<FishingReport/>}/>
      <Route path="/bait" element={<Bait/>}/>
      <Route path="/blog" element={<Blog/>}/>
      <Route path="/brands" element={<Brands/>}/>
      <Route path="/charters" element={<Charters/>}/>
      <Route path="/species/freshwater" element={<Freshwater/>}/>
      <Route path="/species/saltwater" element={<Saltwater/>}/>
      <Route path="/species/pelagic" element={<Pelagic/>}/>
      <Route path="/areas/blockisland" element={<BlockIsland/>}/>
      <Route path="/areas/lowernarragansettbay" element={<LowerNarragansettBay/>}/>
      <Route path="/areas/midnarragansettbay" element={<MidNarragansettBay/>}/>
      <Route path="/areas/uppernarragansettbay" element={<UpperNarragansettBay/>}/>
      <Route path="/areas/offshore" element={<Offshore/>}/>
      <Route path="/areas/providence" element={<Providence/>}/>
      <Route path="/areas/southshore" element={<SouthShore/>}/>
    </Routes>

   

    </>
    )
};

export default App;

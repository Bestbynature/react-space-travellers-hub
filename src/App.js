import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Rockets from './components/Rockets';
import Missions from './components/Missions';
import Myprofile from './components/Myprofile';
import Header from './components/Header';

const App = () => (
  <div className="App">
    <Header />
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route index element={<Rockets />} />
      <Route path="/missions" element={<Missions />} />
      <Route path="/myprofile" element={<Myprofile />} />
    </Routes>
  </div>
);

export default App;

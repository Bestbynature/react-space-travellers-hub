import React from 'react';
import Navlink from './Navlink';
import planet from '../assets/planet.png';

const Header = () => (
  <>
    <header>
      <img src={planet} alt="planet" />
      <h1>Space Travelers&apos; Hub</h1>
      <Navlink />
    </header>
  </>
);

export default Header;

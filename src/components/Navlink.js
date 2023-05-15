import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { activechoose } from '../redux/missions/missionsSlice';

const Navlink = () => {
  const { active } = useSelector((store) => store.missions);
  const dispatch = useDispatch();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className={active === 1 ? 'active-link' : ''} onClick={() => dispatch(activechoose(1))}>Rockets</Link>
        </li>
        <li>
          <Link to="missions" className={active === 2 ? 'active-link' : ''} onClick={() => dispatch(activechoose(2))}>Missions</Link>
        </li>
        <span>|</span>
        <li>
          <Link to="myprofile" className={active === 3 ? 'active-link' : ''} onClick={() => dispatch(activechoose(3))}>Myprofile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navlink;

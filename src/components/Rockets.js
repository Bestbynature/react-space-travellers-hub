import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRockets } from '../redux/rockets/rocketsSlice';
import Rocketitem from './Rocketitem';
import { activechoose } from '../redux/missions/missionsSlice';

const Rockets = () => {
  const dispatch = useDispatch();
  const { rockets, loading } = useSelector((store) => store.rockets);

  useEffect(() => {
    if (rockets.length === 0) {
      dispatch(fetchRockets());
      dispatch(activechoose(1));
    }
  }, [dispatch, rockets]);

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div>
      {rockets.map((rocket) => (
        <div key={rocket.id}>
          <Rocketitem rocket={rocket} />
        </div>
      ))}
    </div>
  );
};

export default Rockets;

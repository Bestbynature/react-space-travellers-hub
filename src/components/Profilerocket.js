import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bookedRockets } from '../redux/rockets/rocketsSlice';

const Profilerocket = () => {
  const { reservedRockets } = useSelector((store) => store.rockets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bookedRockets());
  }, [dispatch]);

  return (
    <div className="profile-rocket">
      <h3>My Rockets</h3>
      {reservedRockets.map((rocket) => (
        <div key={rocket.id}>{rocket.name}</div>
      ))}
    </div>
  );
};

export default Profilerocket;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMissions } from '../redux/missions/missionsSlice';

const Profilemission = () => {
  const { joinedmissions } = useSelector((store) => store.missions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMissions());
  }, [dispatch]);

  return (
    <div className="profile-mission">
      <h3>My Missions</h3>
      {joinedmissions.map((mission) => (
        <div key={mission.id}>{mission.name}</div>
      ))}
    </div>
  );
};

export default Profilemission;

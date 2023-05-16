import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMissions } from '../redux/missions/missionsSlice';
import Missionitem from './Missionitem';

const Missions = () => {
  const dispatch = useDispatch();
  const { missions, loading } = useSelector((store) => store.missions);

  useEffect(() => {
    if (!missions.length) {
      dispatch(fetchMissions());
    }
  }, [dispatch, missions]);

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="missions">
      <div className="table">
        <div className="table-row">
          <div><h3>Mission</h3></div>
          <div><h3>Description</h3></div>
          <div><h3>Status</h3></div>
          <div>&nbsp;</div>
        </div>

        {missions.map((mission) => (
          <div key={mission.id} className="mission-item-container">
            <Missionitem mission={mission} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Missions;

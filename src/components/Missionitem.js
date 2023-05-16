import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { joinMission } from '../redux/missions/missionsSlice';

const Missionitem = ({ mission }) => {
  const dispatch = useDispatch();

  const {
    id, name, description, joined,
  } = mission;
  return (
    <div className="mission-item">
      <div><h3>{name}</h3></div>
      <div>{description}</div>
      <div>
        <button
          type="button"
          className={joined ? 'member' : 'non-member'}
        >
          {joined ? 'Active Member' : 'NOT A MEMBER'}
        </button>
      </div>
      <div>
        <button
          type="button"
          className={joined ? 'leave' : ''}
          onClick={() => dispatch(joinMission(id))}
        >
          {joined ? 'Leave Mission' : 'Join Mission'}
        </button>
      </div>
    </div>
  );
};

Missionitem.propTypes = {
  mission: PropTypes.instanceOf(Object).isRequired,
};

export default Missionitem;

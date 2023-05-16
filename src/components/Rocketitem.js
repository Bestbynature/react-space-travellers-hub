import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { reserveRocket } from '../redux/rockets/rocketsSlice';

const Rocketitem = ({ rocket }) => {
  const dispatch = useDispatch();

  const {
    image, name, reserved, description, id,
  } = rocket;

  return (
    <div className="rocket-item">
      <img src={image} alt={name} />
      <div className="details">
        <h2>{name}</h2>
        <p>
          {reserved && <span>Reserved</span> }
          {description}
        </p>
        <button
          type="button"
          className={reserved ? 'reserved' : 'available'}
          onClick={() => dispatch(reserveRocket(id))}
        >
          {reserved ? 'Cancel Reservation' : 'Reserve Rocket'}
        </button>
      </div>
    </div>
  );
};

Rocketitem.propTypes = {
  rocket: PropTypes.instanceOf(Object).isRequired,
};

export default Rocketitem;

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useDispatch } from 'react-redux';
import Rocketitem from '../components/Rocketitem';
import { reserveRocket } from '../redux/rockets/rocketsSlice';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
jest.mock('../redux/rockets/rocketsSlice', () => ({
  reserveRocket: jest.fn(),
}));

describe('Rocketitem', () => {
  test('renders rocket item and handles reservation', () => {
    useDispatch.mockReturnValue(jest.fn());

    const rocket = {
      id: 1,
      name: 'Rocket 1',
      image: 'rocket1.jpg',
      reserved: false,
      description: 'Rocket 1 Description',
    };

    const { getByText, getByRole } = render(<Rocketitem rocket={rocket} />);

    expect(getByText('Rocket 1')).toBeInTheDocument();
    expect(getByText('Rocket 1 Description')).toBeInTheDocument();

    const reserveButton = getByRole('button', { name: 'Reserve Rocket' });
    fireEvent.click(reserveButton);

    expect(reserveRocket).toHaveBeenCalledWith(1);

    fireEvent.click(reserveButton);

    expect(reserveRocket).toHaveBeenCalledWith(1);
  });

  test('renders reserved rocket item', () => {
    useDispatch.mockReturnValue(jest.fn());

    const rocket = {
      id: 2,
      name: 'Rocket 2',
      image: 'rocket2.jpg',
      reserved: true,
      description: 'Rocket 2 Description',
    };

    const { getByText } = render(<Rocketitem rocket={rocket} />);

    expect(getByText('Rocket 2')).toBeInTheDocument();
    expect(getByText('Reserved')).toBeInTheDocument();
  });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Navlink from '../components/Navlink';
import { activechoose } from '../redux/missions/missionsSlice';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../redux/missions/missionsSlice', () => ({
  activechoose: jest.fn(),
}));

describe('Navlink', () => {
  test('renders nav links and handles active state', () => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue({ active: 1 });

    const { getByText, getByRole } = render(
      <MemoryRouter>
        <Navlink />
      </MemoryRouter>
    );
    expect(getByText('Rockets')).toBeInTheDocument();
    expect(getByText('Missions')).toBeInTheDocument();
    expect(getByText('Myprofile')).toBeInTheDocument();
    fireEvent.click(getByRole('link', { name: 'Rockets' }));
    expect(getByRole('link', { name: 'Rockets' })).toHaveClass('active-link');
    fireEvent.click(getByRole('link', { name: 'Missions' }));
    expect(activechoose).toHaveBeenCalledWith(2);
  });
});

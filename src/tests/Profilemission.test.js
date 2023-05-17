import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import Profilemission from '../components/Profilemission';
import { getMissions } from '../redux/missions/missionsSlice';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock('../redux/missions/missionsSlice', () => ({
  getMissions: jest.fn(),
}));

describe('Profilemission', () => {
  test('renders joined missions', async () => {
    useSelector.mockReturnValue({
      joinedmissions: [
        { id: 1, name: 'Mission 1' },
        { id: 2, name: 'Mission 2' },
      ],
    });
    useDispatch.mockReturnValue(jest.fn());

    const { getByText } = render(<Profilemission />);

    await waitFor(() => {
      expect(getByText('Mission 1')).toBeInTheDocument();
      expect(getByText('Mission 2')).toBeInTheDocument();
      expect(getMissions).toHaveBeenCalled();
    });
  });
});

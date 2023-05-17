import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { useDispatch, useSelector } from 'react-redux';
import Missions from '../components/Missions';
import { fetchMissions } from '../redux/missions/missionsSlice';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../redux/missions/missionsSlice', () => ({
  fetchMissions: jest.fn(),
}));

describe('Missions component', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue({
      missions: [
        {
          id: 1, name: 'Mission 1', description: 'Description 1', status: 'Pending',
        },
        {
          id: 2, name: 'Mission 2', description: 'Description 2', status: 'Completed',
        },
      ],
      loading: false,
    });
  });

  afterEach(() => {
    useDispatch.mockReset();
    useSelector.mockReset();
    fetchMissions.mockReset();
  });

  test('renders missions list correctly', async () => {
    render(<Missions />);

    await waitFor(() => {
      expect(fetchMissions).not.toHaveBeenCalled();
    });

    const missionItems = screen.getAllByTestId('mission-item');
    expect(missionItems.length).toBe(2);
  });

  test('fetches missions if missions array is empty', async () => {
    useSelector.mockReturnValueOnce({
      missions: [],
      loading: false,
    });

    render(<Missions />);

    await waitFor(() => {
      expect(fetchMissions).toHaveBeenCalled();
    });
  });

  test('renders loading message when loading is true', () => {
    useSelector.mockReturnValueOnce({
      missions: [],
      loading: true,
    });

    const { getByText } = render(<Missions />);

    const loadingMessage = getByText('Loading...');
    expect(loadingMessage).toBeInTheDocument();
  });
});

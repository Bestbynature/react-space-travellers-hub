import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import '@testing-library/jest-dom/extend-expect'; // Import the extend-expect function
import Missionitem from '../components/Missionitem';
import { joinMission } from '../redux/missions/missionsSlice';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
  }));
  
  describe('MissionItem', () => {
    test('renders mission details and handles join/leave actions', () => {
      const mockDispatch = jest.fn();
      useDispatch.mockReturnValue(mockDispatch);
  
      const mission = {
        id: 1,
        name: 'Mission 1',
        description: 'Mission description',
        joined: false,
      };
  
      const { getByText, getByRole } = render(<Missionitem mission={mission} />);
  
      expect(getByText('Mission 1')).toBeInTheDocument();
      expect(getByText('Mission description')).toBeInTheDocument();
      expect(getByRole('button', { name: 'NOT A MEMBER' })).toBeInTheDocument();
  
      fireEvent.click(getByRole('button', { name: 'Join Mission' }));
      expect(mockDispatch).toHaveBeenCalledWith(joinMission(1));
    });
  });
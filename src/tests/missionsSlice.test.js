import missionsReducer, {
  fetchMissions,
  activechoose,
  joinMission,
  getMissions,
} from '../redux/missions/missionsSlice';

describe('missionsSlice', () => {
  describe('reducers', () => {
    it('should handle initial state', () => {
      expect(missionsReducer(undefined, {})).toEqual({
        missions: [],
        status: 'idle',
        loading: false,
        error: null,
        joinedmissions: [],
        active: 1,
      });
    });

    it('should handle activechoose', () => {
      const initialState = {
        missions: [],
        status: 'idle',
        loading: false,
        error: null,
        joinedmissions: [],
        active: 1,
      };
      const nextState = missionsReducer(initialState, activechoose(2));
      expect(nextState.active).toEqual(2);
    });

    it('should handle joinMission', () => {
      const mission = {
        id: 1,
        name: 'Mission 1',
        description: 'Description 1',
        joined: false,
      };
      const initialState = {
        missions: [mission],
        status: 'idle',
        loading: false,
        error: null,
        joinedmissions: [],
        active: 1,
      };
      const nextState = missionsReducer(initialState, joinMission(1));
      expect(nextState.missions[0].joined).toBe(true);
    });

    it('should handle getMissions', () => {
      const mission = {
        id: 1,
        name: 'Mission 1',
        description: 'Description 1',
        joined: true,
      };
      const initialState = {
        missions: [mission],
        status: 'idle',
        loading: false,
        error: null,
        joinedmissions: [],
        active: 1,
      };
      const nextState = missionsReducer(initialState, getMissions());
      expect(nextState.joinedmissions).toEqual([mission]);
    });
  });

  describe('async actions', () => {
    it('should handle fetchMissions.pending', () => {
      const initialState = {
        missions: [],
        status: 'idle',
        loading: false,
        error: null,
        joinedmissions: [],
        active: 1,
      };
      const nextState = missionsReducer(initialState, fetchMissions.pending());
      expect(nextState.status).toEqual('loading');
      expect(nextState.loading).toBe(true);
    });

    it('should handle fetchMissions.fulfilled', () => {
      const initialState = {
        missions: [],
        status: 'loading',
        loading: true,
        error: null,
        joinedmissions: [],
        active: 1,
      };
      const payload = [
        { mission_id: 1, mission_name: 'Mission 1', description: 'Description 1' },
        { mission_id: 2, mission_name: 'Mission 2', description: 'Description 2' },
      ];
      const nextState = missionsReducer(initialState, {
        type: 'missions/fetchMissions/fulfilled',
        payload,
      });
      expect(nextState.status).toEqual('succeeded');
      expect(nextState.missions).toEqual([
        { id: 1, name: 'Mission 1', description: 'Description 1', joined: false },
        { id: 2, name: 'Mission 2', description: 'Description 2', joined: false },
      ]);
      expect(nextState.loading).toBe(false);
    });

    it('should handle fetchMissions.rejected', () => {
      const initialState = {
        missions: [],
        status: 'loading',
        loading: true,
        error: null,
        joinedmissions: [],
        active: 1,
      };
      const error = 'An error occurred.';
      const nextState = missionsReducer(initialState, {
        type: 'missions/fetchMissions/rejected',
        error: error,
      });
      expect(nextState.status).toEqual('failed');
      expect(nextState.error).toEqual(error.message);
    });
  });
});

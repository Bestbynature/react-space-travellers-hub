import { configureStore } from '@reduxjs/toolkit';
import rocketsReducer, { fetchRockets } from '../redux/rockets/rocketsSlice';

describe('rocketsSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        rockets: rocketsReducer,
      },
    });
  });

  it('should handle fetchRockets', async () => {
    await store.dispatch(fetchRockets());
    const rockets = store.getState().rockets.rockets;
    const loading = store.getState().rockets.loading;
    expect(rockets).toHaveLength(4);
    expect(loading).toBe(false);
  });
});

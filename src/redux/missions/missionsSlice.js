import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://api.spacexdata.com/v3/missions';

const initialState = {
  missions: [],
  status: 'idle',
  loading: false,
  error: null,
  joinedmissions: [],
  active: JSON.parse(localStorage.getItem('active')) || 1,
};

export const fetchMissions = createAsyncThunk('missions/fetchMissions', async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return isRejectedWithValue(error.response.data);
  }
});

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    activechoose(state, action) {
      localStorage.setItem('active', JSON.stringify(Number(action.payload)));
      state.active = JSON.parse(localStorage.getItem('active'));
    },
    joinMission(state, action) {
      const mission = state.missions.find((mission) => mission.id === action.payload);
      if (mission) {
        mission.joined = !mission.joined;
      }
    },
    getMissions(state) {
      const mission = state.missions.filter((mission) => mission.joined === true);
      state.joinedmissions = [...mission];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissions.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(fetchMissions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.missions = action.payload.map((mission) => ({
          id: mission.mission_id,
          name: mission.mission_name,
          description: mission.description,
          joined: false,
        }));
        state.loading = false;
      })
      .addCase(fetchMissions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { activechoose, joinMission, getMissions } = missionsSlice.actions;

export default missionsSlice.reducer;

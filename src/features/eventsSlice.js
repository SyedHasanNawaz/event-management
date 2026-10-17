import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_TM_API_KEY;
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async (searchTerm = '') => {
  const response = await axios.get(BASE_URL, {
    params: { apikey: API_KEY, keyword: searchTerm, size: 20 },
  });
  return response.data._embedded?.events || [];
});

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    list: [],
    registered: JSON.parse(localStorage.getItem('registered')) || [],
    status: 'idle',
    error: null,
  },
  reducers: {
    registerEvent: (state, action) => {
      const exists = state.registered.find((e) => e.id === action.payload.id);
      if (!exists) {
        state.registered.push(action.payload);
        localStorage.setItem('registered', JSON.stringify(state.registered));
      }
    },
    cancelRegistration: (state, action) => {
      state.registered = state.registered.filter((e) => e.id !== action.payload);
      localStorage.setItem('registered', JSON.stringify(state.registered));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { registerEvent, cancelRegistration } = eventsSlice.actions;
export default eventsSlice.reducer;

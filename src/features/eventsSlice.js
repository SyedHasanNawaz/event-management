import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_TM_API_KEY;
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async (searchTerm = '') => {
  const response = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      keyword: searchTerm,
      size: 20,
    },
  });
  return response.data._embedded?.events || [];
});

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
      })
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

export default eventsSlice.reducer;
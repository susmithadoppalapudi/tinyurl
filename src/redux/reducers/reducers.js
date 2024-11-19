import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create async thunk
export const generateShortUrlAsync = createAsyncThunk(
  'shortUrl/generateShortUrl',
  async (url) => {
    const response = await axios.post(
      `https://api.tinyurl.com/create?url=${encodeURIComponent(url)}`,
      { url },
      {
        headers: {
          'Authorization': 'Bearer 8PyICVVpyZZliWNib7iEJwmg6Xumc3NGqMwI5FTPz80BxRiygZz0BHihlTZW',
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data.data.tiny_url;
  }
);

const shortUrlSlice = createSlice({
  name: 'shortUrl',
  initialState: {
    url: '',
    shortUrl: '',
    loading: false,
    error: null
  },
  reducers: {
    setUrl: (state, action) => {
      state.url = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateShortUrlAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateShortUrlAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.shortUrl = action.payload;
      })
      .addCase(generateShortUrlAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setUrl } = shortUrlSlice.actions;
export default shortUrlSlice.reducer;
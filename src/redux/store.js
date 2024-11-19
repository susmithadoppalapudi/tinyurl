import { configureStore } from '@reduxjs/toolkit';
import shortUrlReducer from './reducers/reducers';

const store = configureStore({
  reducer: {
    shortUrl: shortUrlReducer,
  },
});

export default store;
/**
 * API interaction definition using RTK Query
 */
import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from '@reduxjs/toolkit';

const apiSlice = createSlice({
  name: 'app',
  initialState: {language: 'en', notifications: true},
  reducers: {
    switchLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    switchNotifications(state, action: PayloadAction<boolean>) {
      state.notifications = action.payload;
    },
  },
});

// Extract the action creators object and the reducer
const {actions, reducer} = apiSlice;
// Extract and export each action creator by name
export const {switchLanguage, switchNotifications} = actions;
// Export the reducer, either as a default or named export
export default reducer;

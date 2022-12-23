/*
import {SWITCHLANGUAGE} from '../actions/actions';

const initialState = {
  locale: 'en',
  onboarding: null,
  authToken: null,
};

const appReducer = (state = initialState, action) => {
  switch (action?.type) {
    case SWITCHLANGUAGE:
      return {...state, locale: action?.payload};
  }
  return state;
};

export default appReducer;
*/

/**
 * Authentication reducer
 */
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store/configureStore';

type AppState = {
  user: string | null;
  authToken: string | null;
  locale: string;
};

const slice = createSlice({
  name: 'app',
  initialState: {user: null, authToken: null, locale: 'en'} as AppState,
  reducers: {
    switchLanguage: (state, action: PayloadAction<string>) => {
      state.locale = action.payload;
    },
    setCredentials: (
      state,
      {payload: {user, token}}: PayloadAction<{user: string; token: string}>,
    ) => {
      state.user = user;
      state.authToken = token;
    },
    logout: state => {
      state.user = null;
      state.authToken = null;
    },
  },
});

export const {setCredentials, logout, switchLanguage} = slice.actions;

export default slice.reducer;
export const selectCurrentUser = (state: RootState) => state.app.user;
export const selectCurrentToken = (state: RootState) => state.app.authToken;

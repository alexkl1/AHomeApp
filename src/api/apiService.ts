// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {AuthRequest, AuthResult, Cameras, Sensors} from './apiTypes';
import {RootState} from '../store/configureStore';
//import type {Pokemon} from './types';

const APIURL = 'https://api.ahomeapp.online';
// Define a service using a base URL and expected endpoints
export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({
    baseUrl: APIURL,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState)?.app?.authToken;
      if (token) {
        headers.set('authentication', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getSensors: builder.query<Sensors, null>({
      query: () => '/sensors',
    }),
    getCameras: builder.query<Cameras, null>({
      query: () => '/cameras',
    }),
    auth: builder.mutation<AuthResult, AuthRequest>({
      query: data => {
        return {url: 'auth', method: 'POST', body: data};
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetSensorsQuery,
  useAuthMutation,
  reducerPath,
  reducer,
  middleware,
} = appApi;

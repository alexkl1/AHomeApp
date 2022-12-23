// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {AuthRequest, AuthResult, Cameras, Sensors} from './apiTypes';
import {RootState} from '../store/configureStore';
//import type {Pokemon} from './types';
import Config from 'react-native-config';
import {setCredentials} from '../reducers/appReducer';

//const APIURL = Config.API_URL;
const APIURL = 'http://localhost:3000';
// Define a service using a base URL and expected endpoints
console.log('APIURL=', APIURL);
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
        return {
          url: 'auth',
          method: 'POST',
          body: data,
        };
      },
      onQueryStarted: async (args, {dispatch, queryFulfilled}) => {
        try {
          const result = await queryFulfilled;
          console.log('Query result: ', result);
          await dispatch(
            setCredentials({
              user: result?.data.user,
              token: result?.data.token,
            }),
          );
        } catch (error) {}
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

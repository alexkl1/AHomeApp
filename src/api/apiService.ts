// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
  AuthRequest,
  AuthResult,
  Cameras,
  SensorsResult,
  SnapShotRequest,
} from './apiTypes';
import {RootState} from '../store/configureStore';
//import type {Pokemon} from './types';
//import Config from 'react-native-config';
import {setCredentials} from '../reducers/appReducer';
// @ts-ignore

//const APIURL = Config.API_URL;
const APIURL = 'http://10.243.161.195:3000';
const RNFS = require('react-native-fs');
// Define a service using a base URL and expected endpoints
console.log('APIURL=', APIURL);
export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({
    baseUrl: APIURL,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState)?.app?.authToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getSensors: builder.query<SensorsResult, null>({
      query: () => '/sensors',
    }),
    getCameras: builder.query<Cameras, null>({
      query: () => '/cameras',
    }),
    getSnapshot: builder.query<any, SnapShotRequest>({
      queryFn: async (
        args,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        {signal, dispatch, getState},
      ) => {
        //console.log('START SNAPSHOT with ', args, extraOptions);
        const fname = RNFS.DocumentDirectoryPath + `/cam_${args.id}.jpg`;
        const token = (getState() as RootState)?.app?.authToken;
        try {
          const {promise} = RNFS.downloadFile({
            fromUrl: `${APIURL}/snapshot/?id=${args?.id}`,
            headers: {authorization: `Bearer ${token}`},
            background: false,
            toFile: fname,
            cacheable: false,
          });
          const result = await promise;
          //console.log('jobid=', jobId, 'Result=', result);
          return {data: {lastUpdate: Date.now(), result: result}};
        } catch (e) {
          console.log('Failed to get snapshot');
          return {error: 'Failed to get snapshot: ' + JSON.stringify(e)};
        }
      },
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
  useGetCamerasQuery,
  useGetSnapshotQuery,
  useAuthMutation,
  reducerPath,
  reducer,
  middleware,
} = appApi;

export default appApi;

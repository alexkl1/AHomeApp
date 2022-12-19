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

import {SWITCHLANGUAGE} from '../actions/actions';

const initialState = {
  locale: 'en',
  sensors: null,
  cameras: null,
  onboarding: null,
};

const appReducer = (state = initialState, action) => {
  switch (action?.type) {
    case SWITCHLANGUAGE:
      return {...state, locale: action?.payload};
  }
  return state;
};

export default appReducer;

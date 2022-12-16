import {SWITCHLANGUAGE} from '../actions/actions';

const initialState = {
  locale: 'en',
};

const appReducer = (state = initialState, action) => {
  switch (action) {
    case SWITCHLANGUAGE:
      return state;
  }
};

export default appReducer;

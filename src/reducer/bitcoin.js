import {
  REQUEST,
  START,
  FAILED,
  RECEIVE,
  BITCOIN,
  UPDATE,
  PERIOD,
  MAP
} from '../constants';

import {createSelector} from 'reselect'

const initialState = {
  isInvalid: false,
  isLoading: false,
  lapse: 0
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case REQUEST + START:
      return {
        ...state,
        isInvalid: false,
        isLoading: true
      }
    case RECEIVE + BITCOIN:
      return {
        ...state,
        isInvalid: false,
        current: payload,
        isLoading: false
      }
    case REQUEST + FAILED:
      return {
        ...state,
        isInvalid: true,
        isLoading: false,
        error: payload
      }
    case UPDATE + PERIOD:
      return {
        ...state,
        lapse: payload
      }
    case UPDATE + MAP:
      return {
        ...state,
        data: payload,
      }
    default:
      return state;
    }
};

export const stateSelector = (state) => state['bitcoin'];
export const currentSelector = createSelector(stateSelector, (bitcoin) => bitcoin['current']);


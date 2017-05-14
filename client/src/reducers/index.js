import { constants } from '../actions/photo';
import { resolved, rejected } from '../middleware/api';

const initialState = {
  data: {
    error: false
  },
  fetching: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case constants.GET_PHOTOS:
      return { ...state, fetching: true };

    case resolved(constants.GET_PHOTOS):
      return { ...state, data: payload, fetching: false };

    case rejected(constants.GET_PHOTOS):
      return { ...state, data: payload, fetching: false };

    case constants.SET_PHOTO_LIKE:
      return { ...state, fetching: true };

    case resolved(constants.SET_PHOTO_LIKE):
      return { ...state, data: payload, fetching: false };

    case rejected(constants.SET_PHOTO_LIKE):
      return { ...state, data: payload, fetching: false };

    default:
      return state;
  }
}

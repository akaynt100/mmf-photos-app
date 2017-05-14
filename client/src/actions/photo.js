import api from '../utils/api';
import { createConstants } from '../utils';

export const constants = createConstants(
  'GET_PHOTOS',
  'SET_PHOTO_LIKE'
);

export const actions = {
  getPhotos: () => ({
    type: constants.GET_PHOTOS,
    meta: {
      apiCall: api.photos.getAll
    }
  }),
  setPhotoLike: (id) => ({
    type: constants.SET_PHOTO_LIKE,
    payload: { id },
    meta: {
      apiCall: api.photos.setLike
    }
  })
};

export default actions;

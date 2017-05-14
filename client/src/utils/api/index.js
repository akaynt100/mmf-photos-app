import { getJSON, sendData } from './requests';

export default {
  photos: {
    getAll: getJSON('/photos'),
    setLike: sendData('put', '/photos')
  }
};

import express from 'express';
import mongoose from 'mongoose';
import Photo from '../models/photo';
import { PHOTOS_API_PREFIX } from '../constants/server';
import asyncMiddleware from '../middleware/async';
import handleErrors from '../middleware/handleErrors';
import mongoAsyncHandler from '../utils/mongoAsyncHandler';
import { prepareSuccessAnswer } from '../utils/prepareAnswer';

const ObjectId = mongoose.Types.ObjectId;

export const createPhotos = asyncMiddleware((req, res) => Photo.insertMany([
  {
    path: 'test-img1.jpg',
    likes: 0
  },
  {
    path: 'test-img2.jpg',
    likes: 0
  },
  {
    path: 'test-img3.jpg',
    likes: 0
  },
  {
    path: 'test-img4.jpg',
    likes: 0
  },
  {
    path: 'test-img5.jpg',
    likes: 0
  },
  {
    path: 'test-img6.jpg',
    likes: 0
  },
  {
    path: 'test-img7.jpg',
    likes: 0
  },
  {
    path: 'test-img8.jpg',
    likes: 0
  }
])
  .then((result) => {
    res.json(result);
  })
);

const getAllPhotos = () => mongoAsyncHandler(Photo.find().sort({ likes: -1 }));

const getPhotos = asyncMiddleware((req, res) =>
  getAllPhotos()
    .then(photos => {
      res.json(prepareSuccessAnswer({ photos }));
    })
);

const setLike = asyncMiddleware((req, res) => {
  const { body: { id } } = req;
  const findPhoto = mongoAsyncHandler(Photo.findById({
    _id: new ObjectId(id)
  }));

  return findPhoto
    .then((photo) => {
      if (!photo) {
        throw new Error('Invalid photo id');
      }
      return photo;
    })
    .then((photo) => {
      photo.likes = ++photo.likes;
      return photo
        .save()
        .then(() => getAllPhotos()
          .then(photos => {
            res.json(prepareSuccessAnswer({ photos }));
          })
        );
    });
});

const router = express.Router();

router
  .post(`${PHOTOS_API_PREFIX}/create`, createPhotos)
  .get(PHOTOS_API_PREFIX, getPhotos)
  .put(PHOTOS_API_PREFIX, setLike)
  .use(PHOTOS_API_PREFIX, handleErrors);

export default router;

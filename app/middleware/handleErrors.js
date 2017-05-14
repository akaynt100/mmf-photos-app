import { prepareFailedAnswer } from '../utils/prepareAnswer';

const handleErrors = (error, req, res, next) => {
  if (error) {
    console.log(error.message);
    return res.status(404).send(prepareFailedAnswer(error)); // add error instances
  }
  next();
};

export default handleErrors;

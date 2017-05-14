export const prepareSuccessAnswer = (data) => ({
  error: false,
  data
});

export const prepareFailedAnswer = (err) => ({
  error: true,
  message: err.message
});

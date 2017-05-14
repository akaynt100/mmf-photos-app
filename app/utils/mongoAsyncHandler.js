const mongoAsyncHandler = query => Promise.resolve(query.exec())
    .then(
      result => result,
      error => { throw new Error(error.message); }
    );

export default mongoAsyncHandler;

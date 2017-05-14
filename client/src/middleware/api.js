export const isPending = action => !!action.meta && !!action.meta.apiCall;

export const resolved = type => `${type}_SUCCESS`;
export const isResolved = type => type.endsWith('_SUCCESS');

export const rejected = type => `${type}_FAILED`;
export const isRejected = type => type.endsWith('_FAILED');


const handleApiCall = ({ action, dispatch }) => {
  const {
    type,
    payload,
    meta: {
      apiCall,
      apiResolvedMeta,
      apiRejectedMeta,
      ...otherMeta
    }
  } = action;

  return apiCall(payload).then((result) => dispatch({
    type: resolved(type),
    payload: result,
    meta: {
      ...otherMeta,
      ...apiResolvedMeta,
      requestAction: action
    }
  })
  ).catch((error) => {
    throw dispatch({
      type: rejected(type),
      error: true,
      payload: {
        error: true,
        messages: error
      },
      meta: {
        ...otherMeta,
        ...apiRejectedMeta,
        requestAction: action,
        apiCallError: error
      }
    });
  });
};

export default ({ dispatch }) => next => (action) => {
  if (!action.meta || !action.meta.apiCall) {
    return next(action);
  }
  next(action);
  return handleApiCall({ action, dispatch });
};

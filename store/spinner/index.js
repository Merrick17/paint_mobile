const initialSpinnerService = false;

export const spinnerReducer = (state = initialSpinnerService, action) => {
  switch (action.type) {
    case 'SHOW_SPINNER':
      return true;
    case 'HIDE_SPINNER':
      return false;
    default:
      return state;
  }
};

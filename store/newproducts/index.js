const productsInitState = [];

export const newproductsReducer = (state = productsInitState, action) => {
  switch (action.type) {
    case 'GET_NEW_PRODUCTS':
      return action.data;
    default:
       return state;
  }
};

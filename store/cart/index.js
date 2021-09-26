const initalCartState = [];

export const cartReducer = (state = initalCartState, action) => {
  switch (action.type) {
    case 'GET_CART_ITEMS':
      return action.data;
    case 'ADD_CART_ITEM':
      return action.data;
    case 'UPDATE_CART_ITEM':
      return action.data;
    case 'DELETE_CART_ITEM':
      return action.data;
    default:
      return state;
  }
};

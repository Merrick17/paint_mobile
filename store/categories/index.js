const initialCategories = [];

export const categoriesReducer = (state = initialCategories, action) => {
  switch (action.type) {
    case 'GET_ALL_CATEGORIES':
      return action.data;
    default:
      return state;
  }
};

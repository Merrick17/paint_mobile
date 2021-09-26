const selectedCategory = {
  name: '',
  id: '',
};

export const SelectedCateg = (state = selectedCategory, action) => {
  switch (action.type) {
    case 'GET_CATEG_SELECTED':
      return state;
    case 'SET_CATEG_SELECTED':
      return action.data;
    default:
      return state;
  }
};

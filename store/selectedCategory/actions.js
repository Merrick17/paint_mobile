export const getCategory = () => {
  return {
    type: 'GET_CATEG_SELECTED',
    data: '',
  };
};

export const setCategory = data => {
  return {
    type: 'SET_CATEG_SELECTED',
    data: data,
  };
};

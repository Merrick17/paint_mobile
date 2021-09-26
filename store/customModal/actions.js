export const showCustomModal = data => {
  return {
    type: 'SHOW_MODAL',
    data: data,
  };
};
export const hideCustomModal = () => {
  return {
    type: 'HIDE_MODAL',
    data: '',
  };
};

export const changeQte = data => {
  return {
    type: 'UPDATE_DATA',
    data: data,
  };
};

const modalInitState = {
  product: null,
  colorRef: "",
  desc: "",
  show: false,
  title: ""
};
export const CustomModal = (state = modalInitState, action) => {
  switch (action.type) {
    case 'HIDE_MODAL':
      return {
        ...state,
        show: false,
      };
    case 'SHOW_MODAL':
      return {
        ...state,
        show: true,
      };

    case 'UPDATE_NAME':
      return { ...state, product: action.payload }
    case 'UPDATE_COLOR':
      return { ...state, colorRef: action.payload }
    case 'UPDATE_TEXT_DESC':
      console.log("REDUCER STATE", action.payload);
      return { ...state, desc: action.payload }
    case 'UPDATE_TITLE':
      return { ...state, title: action.payload }
    case 'UPDATE_PRODUCT':
      return { ...state, product: action.payload }
    default:
      return state;
  }
};

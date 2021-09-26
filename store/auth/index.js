const initUserState = {
  token: '',
  user: {}
};

export const authReducer = (state = initUserState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state, token: action.payload.token,
        user: action.payload.user
      }
    case 'LOGOUT':
      return action.data;
    default:
      return state;
  }
};

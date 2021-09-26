const tendancesInitState = {
  loading: false,
  list: [],
};

const tendanceReducer = (state=tendancesInitState, action) => {
  let {type, payload} = action;

  switch (type) {
    case 'GET_ALL_TENDANCES':
      return {...state, loading: true};

    case 'GET_ALL_TENDANCES_SUCCESS':
      return {...state, loading: false, list: payload};
    default:
      return state;
  }
};

export default tendanceReducer;

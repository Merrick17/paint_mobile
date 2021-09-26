const initialRouteState = {
  name: '',
  id: '',
};

export const RoutingReducer = (state = initialRouteState, action) => {
  switch (action.type) {
    case 'GET_ROUTE_PARAMS':
      return state;
    case 'SET_ROUTE_PARAMS':
      return action.data;
    default:
      return state;
  }
};

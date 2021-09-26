export const getRouteData = () => {
  return {
    type: 'GET_ROUTE_PARAMS',
    data: '',
  };
};

export const setRouteData = data => {
  return {
    type: 'SET_ROUTE_PARAMS',
    data: data,
  };
};

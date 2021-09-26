export const getNewProducts = data => {
  return {
    type: 'GET_NEW_PRODUCTS',
    data: data,
  };
};

export const fetchLatestProducts = () => {
  return async dispatch => {
    try {
      let response = await fetch(
        'http://193.70.91.246:8000/product/latest/items',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      let responseJson = await response.json();
      //console.log(responseJson.products);
      dispatch(getNewProducts(responseJson.products));
    } catch (ex) {}
  };
};

export const getCateogires = data => {
  return {
    type: 'GET_ALL_CATEGORIES',
    data: data,
  };
};

export const fetchAllCategories = () => {
  return async dispatch => {
    try {
      let response = await fetch('http://193.70.91.246:8000/categorie/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      let responseJson = await response.json();
      //console.log(responseJson.categories);
      dispatch(getCateogires(responseJson.categories));
    } catch (ex) {
      console.log(ex);
    }
  };
};

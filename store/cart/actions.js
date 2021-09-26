import {getSavedItem} from '../../helpers/storage';
export const addNewItem = item => {
  return async dispatch => {
    let resToken = await getSavedItem('token');
    let token = JSON.parse(resToken);
    let resCart = await getSavedItem('cart');
    let cart = JSON.parse(resCart);
    let resUser = await getSavedItem('userId');
    let userId = JSON.parse(resUser);
    try {
      let response = await fetch(
        'http://193.70.91.246:8000/cart/' + userId + '/' + cart + '/additem',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            access_token: token,
          },
          body: JSON.stringify(item),
        },
      );
      let responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.token != undefined && responseJson.token != null) {
      } else {
      }
    } catch (ex) {
      console.log(ex);
    }
  };
};

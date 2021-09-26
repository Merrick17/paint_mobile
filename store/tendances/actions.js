import {get} from '../../helpers/apiHelpers';

export const getTendances = () => {
  return {
    type: 'GET_ALL_TENDANCES',
  };
};

export const getTendancesSuccess = data => {
  return {
    type: 'GET_ALL_TENDANCES_SUCCESS',
    payload: data,
  };
};

export const getTendancesApi = () => async dispatch => {
  try {
    let result = await get('tendance');
    if (result.success) {
      console.log('RESULT', result);
      dispatch(getTendancesSuccess(result.result));
    }
  } catch (error) {
    console.log('ERROR', error);
  }
};

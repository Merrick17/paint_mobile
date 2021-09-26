import { get } from "../../helpers/apiHelpers"

export const getAllColorssapi = (payload) => async dispatch => {

    try {
        let result = await get('color/colorlist', payload);
        console.log("RESULT", result);
        dispatch(getAllColors(result.message)); 
    } catch (error) {
        console.log(error);
    }
}

export const getAllColors = (payload) => {
    return {
        payload: payload,
        type: 'GET_ALL_COLORS'
    }
}
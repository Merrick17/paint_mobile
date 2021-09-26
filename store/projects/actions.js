import { get, post } from "../../helpers/apiHelpers"

export const addProjectApi = (payload) => async dispatch => {

    try {

        let result = await post('project/addproject', payload);
        console.log("RESULT PORJECT", result);
    } catch (error) {
        console.log("error", error);
    }
}

export const getAllProjectsByUser = (userId) => async dispatch => {

    try {
        dispatch({
            type: 'GET_ALL_PROJECTS'
        });
        let result = await get('project/' + userId);
        console.log("Result", result);
        dispatch({
            type: 'GET_ALL_PROJECTS_SUCCESS',
            payload: result.message
        })
    } catch (error) {

    }
}
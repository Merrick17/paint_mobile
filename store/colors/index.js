const colorsInitState = {
    colorsList: [],
    loading: false
}

const colorReducer = (state = colorsInitState, action) => {

    let { type, payload } = action;
    switch (type) {
        case 'GET_ALL_COLORS':
            return { ...state, colorsList: payload }

        default:
            return state ; 
    }
}

export default colorReducer ; 
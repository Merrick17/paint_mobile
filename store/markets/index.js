
const initMarketState = {
    loading: false,
    list: []
}

const marketReducer = (state = initMarketState, action) => {
    let { payload, type } = action;

    switch (type) {
        case 'GET_ALL_MARKETS':

           return {...state,list:payload}

        default:
            return state ; 
    }

}

export default marketReducer ; 
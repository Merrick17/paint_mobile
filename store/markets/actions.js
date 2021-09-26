 
import {get} from '../../helpers/apiHelpers' 
export const getAllMarkets = (data) => {
    return {
        type: 'GET_ALL_MARKETS',
        payload: data
    }
}

export const getAllMarketsApi = (config)=>async dispatch=>{
    try {
        let result = await get('magasins/',config); 
        console.log(result) ; 
    } catch (error) {
        
    }
}
import axios from 'axios';

export const BaseUrl = 'https://paint-backend.herokuapp.com';

export const post = async (url, data, config = {}) => {
  try {
    let result = await axios.post(`${BaseUrl}/${url}`, data, config);
    console.log("AXIOS RESPONSE",result)
    return result.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const udpate = async (url, data, config = {}) => {
  try {
    let result = await axios.put(`${BaseUrl}/${url}`, data, config);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const remove = async (url, config = {}) => {
  try {
    let result = await axios.delete(`${BaseUrl}/${url}`, config);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const get = async (url, config = {}) => {
  try {
    let result = await axios.get(`${BaseUrl}/${url}`, config);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

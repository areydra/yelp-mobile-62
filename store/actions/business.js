import axios from 'axios';
import {API_KEY} from 'react-native-dotenv';

export const FETCH_BUSINESS = 'FETCH_BUSINESS';
export const SEARCH_BUSINESS = 'SEARCH_BUSINESS';
export const DETAILS_BUSINESS = 'DETAILS_BUSINESS';

const url = 'https://api.yelp.com/v3';
const location = 'New York City';
const config = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const fetchBusiness = () => {
  return async dispatch => {
    const result = await axios.get(
      `${url}/businesses/search?location=${location}`,
      config
    );
    console.log(result)
    // dispatch({type: FETCH_BUSINESS, payload: result})
  };
};

export const searchBusiness = term => {
  return async dispatch => {
    const result = await axios.get(
      `${url}/businesses/search?term=${term}&location=${location}`,
      config
    );
    dispatch({type: SEARCH_BUSINESS, payload: result});
  };
};

export const detailsBusiness = id => {
    return async dispatch => {
        const result = await axios.get(
          `${url}/businesses/${id}`, config
        );
        dispatch({type: DETAILS_BUSINESS, payload: result})
    }
}
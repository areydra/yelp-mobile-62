import axios from 'axios';
import {API_KEY} from 'react-native-dotenv';

export const FETCH_BUSINESS = 'FETCH_BUSINESS';
export const SEARCH_BUSINESS = 'SEARCH_BUSINESS';
export const DETAILS_BUSINESS = 'DETAILS_BUSINESS';
export const LOAD_MORE_BUSINESS = 'LOAD_MORE_BUSINESS';

const url = 'https://api.yelp.com/v3';
const location = 'New York City';
const config = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const fetchBusiness = () => {
  return async dispatch => {
    await axios
      .get(
        `${url}/businesses/search?location=${location}&offset=1&limit=20`,
        config,
      )
      .then(res => {
        const result = res.data.businesses.length
          ? res.data.businesses
          : 'null';
        dispatch({type: FETCH_BUSINESS, payload: result});
      })
      .catch(err => console.log(err));
  };
};

export const loadMoreBusiness = offset => {
  return async dispatch => {
    await axios
      .get(
        `${url}/businesses/search?location=${location}&offset=${offset}&limit=20`,
        config,
      )
      .then(res => {
        const result = res.data.businesses.length
          ? res.data.businesses
          : 'null';
        dispatch({type: LOAD_MORE_BUSINESS, payload: result});
      })
      .catch(err => console.log(err));
  };
};

export const searchBusiness = term => {
  return async dispatch => {
    await axios
      .get(`${url}/businesses/search?term=${term}&location=${location}`, config)
      .then(res => dispatch({type: SEARCH_BUSINESS, payload: res.data}))
      .catch(err => console.log(err));
  };
};

export const detailsBusiness = id => {
    return async dispatch => {
        await axios
          .get(`${url}/businesses/${id}`, config)
          .then(res => dispatch({type: DETAILS_BUSINESS, payload: res.data}))
          .catch(err => console.log(err));
    }
}

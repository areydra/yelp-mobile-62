import {
  FETCH_BUSINESS,
  SEARCH_BUSINESS,
  DETAILS_BUSINESS,
} from '../actions/business';

const initialState = {
  business: [],
  resetBusiness: [],
  detailsBusiness: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BUSINESS:
      console.log(action.payload)
      return {
        ...state,
      };
    case SEARCH_BUSINESS:
      return;

    case DETAILS_BUSINESS:
      return;

    default:
      return state;
  }
};

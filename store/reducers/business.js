import {
  FETCH_BUSINESS,
  SEARCH_BUSINESS,
  DETAILS_BUSINESS,
  LOAD_MORE_BUSINESS,
} from '../actions/business';

const initialState = {
  business: [],
  resetBusiness: [],
  detailsBusiness: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BUSINESS:
      return {
        ...state,
        business: action.payload,
        resetBusiness: action.payload,
      };

    case LOAD_MORE_BUSINESS:
      return {
        ...state,
        business: [...state.business, ...action.payload]
      };

    case SEARCH_BUSINESS:
      return;

    case DETAILS_BUSINESS:
      return {
        ...state,
        detailsBusiness: action.payload,
      };

    default:
      return state;
  }
};

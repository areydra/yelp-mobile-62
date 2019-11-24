import {
  FETCH_BUSINESS,
  SEARCH_BUSINESS,
  DETAILS_BUSINESS,
  LOAD_MORE_BUSINESS,
  RESET_SEARCH,
  SEARCHING,
} from '../actions/business';

const initialState = {
  business: [],
  resetBusiness: [],
  detailsBusiness: [],
  search: '',
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
      return {
        ...state,
        business: action.payload === 'reset' ? state.resetBusiness : action.payload.length ? action.payload : 'null',
        search: action.search,
      };
    case DETAILS_BUSINESS:
      return {
        ...state,
        detailsBusiness: action.payload,
      };
    case RESET_SEARCH:
      return {
        ...state,
        business: state.resetBusiness,
        search: ''
      };
    case SEARCHING:
      return {
        ...state,
        business: [],
        search: action.search
      };

    default:
      return state;
  }
};

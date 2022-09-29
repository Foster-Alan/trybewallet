import { GET_CURRENCY, GET_CURRENCY_ERROR } from '../actions';

const INITIAL_STATE = {
  currencies: [],
};

const wallet = (state = INITIAL_STATE, { type, currencies, error }) => {
  switch (type) {
  case GET_CURRENCY:
    return { ...state, currencies };

  case GET_CURRENCY_ERROR:
    return { ...state, error };

  default:
    return state;
  }
};

export default wallet;

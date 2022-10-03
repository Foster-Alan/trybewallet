import {
  GET_CURRENCY,
  GET_CURRENCY_ERROR,
  ADD_EXPENSES,
  DELETE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, { type, currencies, error, expenses }) => {
  switch (type) {
  case GET_CURRENCY:
    return {
      ...state,
      currencies: Object.keys(currencies),
    };

  case GET_CURRENCY_ERROR:
    return { ...state, error };

  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, expenses],
    };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...expenses],
    };

  default:
    return state;
  }
};

export default wallet;

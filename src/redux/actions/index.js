// Coloque aqui suas actions
export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';

export const GET_CURRENCY_SUCCESS = 'GET_CURRENCY_SUCCESS';
export const GET_CURRENCY_ERROR = 'GET_CURRENCY_ERROR';

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const SET_EDIT_EXPENSE = 'SET_EDIT_EXPENSE';

export const EDIT_EXPENSE = 'EDIT_EXPENSE';

// actions

export const submitLoginForm = (email) => ({ type: LOGIN_SUBMIT, email });

const getCurrency = (currencies) => ({ type: GET_CURRENCY_SUCCESS, currencies });
const errorCurrency = (error) => ({ type: GET_CURRENCY_ERROR, error });

export const addExpense = (expense) => ({ type: ADD_EXPENSE, expense });
export const deleteExpense = (expense) => ({ type: DELETE_EXPENSE, expense });
export const setToEdit = (editingId) => ({ type: SET_EDIT_EXPENSE, editingId });

export const editExpense = (expense) => ({ type: EDIT_EXPENSE, expense });

// middleware

export const fetchCurrency = () => async (dispatch) => {
  try {
    const currencies = await currencyAPI();
    dispatch(getCurrency(currencies));
  } catch (e) {
    dispatch(errorCurrency(e.message));
  }
};

import currencyAPI from '../../helpers/currencyAPI';

export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';

export const GET_CURRENCY = 'GET_CURRENCY';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const SET_EDIT_EXPENSE = 'SET_EDIT_EXPENSE';

export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const submitLoginForm = (email) => ({
  type: LOGIN_SUBMIT,
  email,
});

const getCurrency = (currencies) => ({ type: GET_CURRENCY, currencies });

export const addExpenses = (expenses) => ({ type: ADD_EXPENSES, expenses });
export const deleteExpense = (expenses) => ({ type: DELETE_EXPENSE, expenses });
export const setToEdit = (id) => ({ type: SET_EDIT_EXPENSE, id });

export const editExpense = (newObject) => ({ type: EDIT_EXPENSE, newObject });

export const fetchCurrency = () => async (dispatch) => {
  const currencies = await currencyAPI();
  dispatch(getCurrency(currencies));
};

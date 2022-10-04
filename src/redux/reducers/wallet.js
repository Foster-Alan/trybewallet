import {
  GET_CURRENCY,
  GET_CURRENCY_ERROR,
  ADD_EXPENSES,
  DELETE_EXPENSE,
  SET_EDIT_EXPENSE,
  EDIT_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isEditing: false,
  editingId: 0,
};

const wallet = (state = INITIAL_STATE, {
  type, currencies, error, expenses, newObject, id, editingId }) => {
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
      isEditing: false,
    };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...expenses],
      isEditing: false,
    };

  case SET_EDIT_EXPENSE:
    console.log(id, 'id');
    return {
      ...state,
      editingId: id,
      isEditing: true,
    };

  case EDIT_EXPENSE:
    console.log(newObject, 'aqui');
    console.log(editingId, 'aqui');
    return {
      ...state,
      isEditing: false,
      expenses: state.expenses.map((expense) => {
        if (expense.id === state.editingId) {
          return { ...newObject, id: state.editingId };
        }
        return expense;
      }),
    };
  default:
    return state;
  }
};

export default wallet;

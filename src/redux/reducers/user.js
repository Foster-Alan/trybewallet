// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN_SUBMIT } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, { type, email }) => {
  switch (type) {
  case LOGIN_SUBMIT:
    return {
      ...state,
      email,
    };
  default:
    return state;
  }
};

export default user;

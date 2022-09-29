import currencyAPI from '../../helpers/currencyAPI';

export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';

export const GET_CURRENCY = 'GET_CURRENCY';
export const GET_CURRENCY_ERROR = 'GET_CURRENCY_ERROR';

const getCurrency = (currencies) => ({ type: GET_CURRENCY, currencies });
const errorCurrency = (error) => ({ type: GET_CURRENCY_ERROR, error });

export const submitLoginForm = (email) => ({
  type: LOGIN_SUBMIT,
  email,
});

export const fetchCurrency = () => async (dispatch) => {
  try {
    const currencies = await currencyAPI();
    delete currencies.USDT;

    const currencyNames = Object.keys(currencies);
    dispatch(getCurrency(currencyNames));
  } catch (e) {
    dispatch(errorCurrency(e));
  }
};

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, arrayOf, string, bool } from 'prop-types';
import { BsCashCoin, BsCoin, BsTags } from 'react-icons/bs';
import { MdOutlineDescription } from 'react-icons/md';
import { FaCoins } from 'react-icons/fa';
import { addExpenses, fetchCurrency, editExpense } from '../redux/actions';

import '../Styles/Wallet.css';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrency());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const { value, description, method, currency, tag, id } = this.state;
    const { dispatch, isEditing } = this.props;
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const coinInfo = await fetch(endpoint);
    const coinJSON = await coinInfo.json();
    const expenseObj = {
      value,
      description,
      method,
      currency,
      tag,
      exchangeRates: coinJSON,
      id,
    };
    if (!isEditing) {
      dispatch(addExpenses(expenseObj));
      this.setState({
        value: '',
        description: '',
        currency,
        method,
        tag,
        id: id + 1,
      });
    }
    if (isEditing) {
      const editObject = {
        value,
        description,
        method,
        currency,
        tag,
        exchangeRates: coinJSON,
      };
      dispatch(editExpense(editObject));
      this.setState({
        value: '',
        description: '',
        currency,
        method,
        tag,
        id,
      });
    }
  };

  render() {
    const { currencies, isEditing } = this.props;
    const { value, currency,
      method, tag, description } = this.state;

    return (
      <section className="wallet-conteiner">
        <label htmlFor="value">
          <BsCoin />
          <input
            type="number"
            name="value"
            id="value"
            placeholder="Insira um valor"
            value={ value }
            onChange={ this.handleChange }
            data-testid="value-input"
          />
        </label>
        { currencies && (
          <label htmlFor="currency">
            <FaCoins />
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChange }
            >
              { currencies.map((el) => (
                <option key={ el } value={ el }>
                  {el}
                </option>
              ))}
            </select>
          </label>
        )}

        <label htmlFor="method">
          <BsCashCoin />
          <select
            name="method"
            id="method"
            value={ method }
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          <BsTags />
          <select
            name="tag"
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <label htmlFor="description">
          <MdOutlineDescription />
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Descrição"
            value={ description }
            onChange={ this.handleChange }
            data-testid="description-input"
          />
        </label>

        <button
          className="css-button-sliding-to-top--black"
          type="button"
          onClick={ this.handleClick }
        >
          { isEditing ? 'Editar despesa' : 'Adicionar despesa' }

        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

WalletForm.propTypes = {
  dispatch: func.isRequired,
  currencies: arrayOf(string).isRequired,
  isEditing: bool.isRequired,
};

export default connect(mapStateToProps)(WalletForm);

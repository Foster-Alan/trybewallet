import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, arrayOf, string } from 'prop-types';
import { fetchCurrency } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrency());
  }

  render() {
    const { currencies } = this.props;

    return (
      <section>
        <label htmlFor="expenseInput">
          Valor
          <input
            type="number"
            name="expenseInput"
            id="expenseInput"
            placeholder="Valor da despesa"
            data-testid="value-input"
          />
        </label>

        <label htmlFor="currencySelect">
          Moeda
          <select
            name="currencySelect"
            id="currencySelect"
            data-testid="currency-input"
          >
            { currencies.map((currency) => (
              <option key={ currency } value={ currency }>
                {currency}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="paySelect">
          Método de pagamento
          <select
            name="paySelect"
            id="paySelect"
            data-testid="method-input"
          >
            <option value="cash">Dinheiro</option>
            <option value="credit">Cartão de crédito</option>
            <option value="debit">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tagSelect">
          Tag
          <select
            name="tagSelect"
            id="tagSelect"
            data-testid="tag-input"
          >
            <option value="food">Alimentação</option>
            <option value="leisure">Lazer</option>
            <option value="work">Trabalho</option>
            <option value="transport">Transporte</option>
            <option value="health">Saúde</option>
          </select>
        </label>

        <label htmlFor="descripInput">
          Descrição
          <input
            type="text"
            name="descripInput"
            id="descripInput"
            placeholder="Descrição"
            data-testid="description-input"
          />
        </label>
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
};

export default connect(mapStateToProps)(WalletForm);

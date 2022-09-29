import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, shape } from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    const getRates = expenses.reduce((total, curr) => {
      const currentCurrency = curr.exchangeRates[curr.currency];
      const currentRate = currentCurrency.ask * curr.value;
      return Number(total) + currentRate;
    }, 0);

    return (
      <header
        className="section is-flex is-justify-content-space-between"
      >
        <p className="is-size-5">
          Despesa total:
          <span>
            {getRates.toFixed(2)}
          </span>
          <span>
            BRL
          </span>
        </p>
        <p>{email}</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

Header.propTypes = {
  email: string.isRequired,
  expenses: arrayOf(shape()).isRequired,
};

export default connect(mapStateToProps)(Header);

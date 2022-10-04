import { Component } from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, shape } from 'prop-types';
import '../Styles/Header.css';
import { FaUserCircle, FaCoins } from 'react-icons/fa';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    console.log(expenses);
    const getRates = expenses.reduce((total, curr) => {
      const currentCurrency = curr.exchangeRates[curr.currency];
      const currentRate = currentCurrency.ask * curr.value;
      const rate = Number((currentRate).toFixed(2));
      return Number(total) + rate;
    }, '0.00');
    return (
      <section className="header-conteiner">
        <nav>
          <h2 data-testid="email-field">
            <FaUserCircle />

            {email}
          </h2>
          <h1>TRYBEWALLET</h1>
          <p>
            <FaCoins size={ 30 } />

            <span data-testid="total-field">
              {getRates}
            </span>
            <span data-testid="header-currency-field">
              BRL
            </span>
          </p>
        </nav>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

Header.propTypes = {
  email: string,
  expenses: arrayOf(shape()),
}.isRequired;

export default connect(mapStateToProps)(Header);

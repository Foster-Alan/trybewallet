import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, shape } from 'prop-types';
import { submitLoginForm } from '../redux/actions';
import '../Styles/Login.css';

class Login extends Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  validateEmail = (email) => (email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i));

  enableButton = () => {
    const { email, password } = this.state;
    const minPassLength = 6;

    if (password.length >= minPassLength && this.validateEmail(email)) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.enableButton());
  };

  handleClick = () => {
    const { email } = this.state;
    const { history: { push }, dispatch } = this.props;

    dispatch(submitLoginForm(email));
    push('/carteira');
  };

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <main className="login-component">
        <h1>TrybeWallet</h1>
        <form>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="E-mail"
            value={ email }
            onChange={ this.handleChange }
            data-testid="email-input"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Senha"
            value={ password }
            onChange={ this.handleChange }
            data-testid="password-input"
          />
          <button type="button" onClick={ this.handleClick } disabled={ isDisabled }>
            Entrar
          </button>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  history: shape(),
  dispatch: func,
}.isRequired;

export default connect()(Login);

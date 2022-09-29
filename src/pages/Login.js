import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, shape } from 'prop-types';
import { submitLoginForm } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  validateEmail = (email) => (email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i));

  enableButton = () => {
    const { email, password } = this.state;
    const min = 6;

    if (password.length >= min && this.validateEmail(email)) {
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

  handleClick = (e) => {
    e.preventDefault();

    const { email } = this.state;
    const { history: { push }, dispatch } = this.props;

    dispatch(submitLoginForm(email));
    push('/carteira');
  };

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div>
        <form>
          <h1>Login</h1>
          <div>
            <label htmlFor="email">
              E-mail
              <input
                data-testid="email-input"
                type="text"
                name="email"
                id="email"
                placeholder="exemplo@exemplo.com"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <label htmlFor="password">
            Senha
            <input
              data-testid="password-input"
              type="password"
              name="password"
              id="password"
              placeholder="*******"
              value={ password }
              onChange={ this.handleChange }

            />
          </label>
          <button
            type="submit"
            onClick={ this.handleClick }
            disabled={ isDisabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: shape().isRequired,
  dispatch: func.isRequired,
};

export default connect()(Login);

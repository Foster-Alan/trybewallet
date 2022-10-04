import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

beforeEach(() => renderWithRouterAndRedux(<App />));

const { history } = renderWithRouterAndRedux(<App />);

const VALID_EMAIL = 'valid@email.com';
const VALID_PASSWORD = 'thirteen';

describe('teste Login', () => {
  it('A página renderiza em /', () => {
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  describe('teste inputs', () => {
    it('Renderiza entradas para email e senha', () => {
      const emailInput = screen.getByPlaceholderText(/e-mail/i);
      const passwordInput = screen.getByPlaceholderText(/senha/i);

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });

    it('o botão só deve ser habilitado se o e-mail e a senha forem válidos', () => {
      const emailInput = screen.getByPlaceholderText(/e-mail/i);
      const passwordInput = screen.getByPlaceholderText(/senha/i);
      const loginBtn = screen.getByRole('button', { name: /entrar/i });

      const INVALID_EMAIL = 'invalid';
      const INVALID_PASSWORD = 'four';

      userEvent.type(emailInput, INVALID_EMAIL);
      userEvent.type(passwordInput, INVALID_PASSWORD);

      expect(loginBtn).toBeDisabled();

      userEvent.type(emailInput, VALID_EMAIL);
      userEvent.type(passwordInput, VALID_PASSWORD);

      expect(loginBtn).toBeEnabled();
    });
  });

  it('clicar no botão deve ir para /carteira', () => {
    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);

    expect(loginBtn).toBeEnabled();

    userEvent.click(loginBtn);

    const addExpenseBtn = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(addExpenseBtn).toBeInTheDocument();
    expect(loginBtn).not.toBeInTheDocument();
  });
});

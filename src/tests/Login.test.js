import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';

import { renderWithRouterAndRedux } from './helpers/renderWith';

const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
const VALID_EMAIL = 'alguem@email.com';
const VALID_PASSWORD = '123456';

afterEach(() => jest.clearAllMocks());

describe('Teste Loguin', () => {
  it('A rota para esta página deve ser \'/\'', () => {
    const { history } = renderWithRouterAndRedux(<App />, '/');
    expect(history.location.pathname).toBe('/');
  });

  it('Crie um imput para que o usuário insira seu email e senha', () => {
    renderWithRouterAndRedux(<App />, '/');
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
  });

  it('Crie um botão com o texto "Entrar"', () => {
    renderWithRouterAndRedux(<App />, '/');

    const button = screen.getByText(/Entrar/i);
    expect(button).toBeInTheDocument();
  });
});

describe('Verificações nos campos de email, senha e botão:', () => {
  it('O botão de "Entrar" está desabilitado ao entrar na página', () => {
    renderWithRouterAndRedux(<App />, '/');

    const button = screen.getByText(/Entrar/i);
    expect(button).toBeDisabled();
  });

  it('O botão de "Entrar" está desabilitado quando um email inválido é digitado', () => {
    renderWithRouterAndRedux(<App />, '/');

    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByText(/Entrar/i);

    userEvent.type(email, 'email');
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.type(email, 'email@com@');
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.type(email, 'emailcom@');
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.type(email, 'alguem@email.');
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();
  });

  it('O botão de "Entrar" está desabilitado quando uma senha inválida é digitada', () => {
    renderWithRouterAndRedux(<App />, '/');

    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByText(/Entrar/i);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, '23456');
    expect(button).toBeDisabled();
  });

  it('O botão de "Entrar" está habilitado quando um email e uma senha válidos são passados', () => {
    renderWithRouterAndRedux(<App />, '/');

    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByText(/Entrar/i);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeEnabled();
  });
});

describe('Teste Redux', () => {
  it('Verifica se o email é salvo', () => {
    const { store } = renderWithRouterAndRedux(<App />, '/');
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByText(/Entrar/i);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    fireEvent.click(button);

    expect(store.getState().user.email).toBe(VALID_EMAIL);
  });

  it('A rota deve ser mudada para carteira após o clique no botão.', () => {
    const { history } = renderWithRouterAndRedux(<App />, '/');
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByText(/Entrar/i);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    fireEvent.click(button);

    expect(history.location.pathname).toBe('/carteira');
  });
});

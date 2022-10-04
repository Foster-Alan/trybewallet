import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const um = 'value-input';
const dois = 'description-input';

describe('Teste wallet', () => {
  it('', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const { location: { pathname } } = history;

    expect(pathname).toBe('/carteira');

    const Email = screen.getByTestId('email-field');
    const valorDespesa = screen.getByTestId('total-field');
    const moeda = screen.getByTestId('header-currency-field');
    const value2 = screen.getByTestId(um);
    const inputDescription = screen.getByTestId(dois);
    const inputAdd = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    expect(Email).toBeInTheDocument();
    expect(valorDespesa).toBeInTheDocument();
    expect(moeda).toBeInTheDocument();
    expect(value2).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
    expect(inputAdd).toBeInTheDocument();
  });

  it('', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const { location: { pathname } } = history;

    expect(pathname).toBe('/carteira');

    const value2 = screen.getByTestId(um);
    const currency = await screen.findByTestId('currency-input');
    const inputDescription = screen.getByTestId(dois);
    const inputAdd = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    expect(inputAdd).toBeInTheDocument();
    userEvent.type(currency, 'USD');

    userEvent.type(value2, '10');
    userEvent.type(inputDescription, 'qualquer coisa');
    userEvent.click(inputAdd);

    const btnExcluir = await screen.findByTestId('delete-btn');
    const data = await screen.findByRole('cell', {
      name: /alimentação/i,
    });

    expect(btnExcluir).toBeInTheDocument();
    expect(data).toBeInTheDocument();

    userEvent.click(btnExcluir);
  });
  it('', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const value = screen.getByTestId(um);
    const imputDespesa = screen.getByTestId(dois);
    const inputAdd = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(value, '10');
    userEvent.type(imputDespesa, 'coisa qualquer');

    userEvent.click(inputAdd);
    await screen.findByTestId('edit-btn');

    userEvent.type(value, '200');
    userEvent.type(imputDespesa, 'bem diferente');

    userEvent.click(inputAdd);
    await screen.findByText('bem diferente');

    const todos = await screen.findAllByTestId('edit-btn');
    userEvent.click(todos[0]);
    userEvent.type(value, '200');
    userEvent.type(imputDespesa, 'bem diferente o retorno');

    const editarDespesa = await screen.findByText(/Editar despesa/i);
    userEvent.click(editarDespesa);
    await screen.findByText('bem diferente o retorno');
  });
});

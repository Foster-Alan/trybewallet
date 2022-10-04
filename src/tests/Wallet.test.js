import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

const walletPath = '/carteira';

const mockInitialState = {
  wallet: {
    currencies: Object.keys(mockData),
    expenses: [{
      id: 0,
      value: '10',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Saúde',
      description: 'Descrição',
      exchangeRates: mockData,
    }],
    editingId: 0,
    isEditing: false,
  },
};

describe('teste Header', () => {
  it('se é renderizado em carteira', () => {
    const { history:
      { location: { pathname } },
    } = renderWithRouterAndRedux(<App />, { initialEntries: [walletPath] });

    expect(pathname).toBe(walletPath);
  });

  it('se renderiza os inputs corretamente', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [walletPath] });

    const value = screen.getByRole('spinbutton', { name: /valor/i });
    const currency = screen.getByRole('combobox', { name: /moeda/i });
    const payMethod = screen.getByRole('combobox', { name: /método de pagamento/i });
    const tag = screen.getByRole('combobox', { name: /tag/i });
    const description = screen.getByRole('textbox', { name: /descrição/i });

    expect(value).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(payMethod).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
  it('renderiza o valor somado das despesas', () => {
    renderWithRouterAndRedux(
      <App />,
      { initialState: mockInitialState,
        initialEntries: [walletPath] },
    );

    const displaySum = screen.getByText(/despesa total:/i);
    expect(displaySum).toHaveTextContent('47.53');
    expect(displaySum).toHaveTextContent('BRL');
  });
});

describe('testes Table e WalletForm', () => {
  beforeEach(() => renderWithRouterAndRedux(
    <App />,
    { initialState: mockInitialState, initialEntries: [walletPath] },
  ));

  it('exclui a despesa ao clicar no botão', () => {
    const displaySum = screen.getByText(/despesa total:/i);
    expect(displaySum).toHaveTextContent('47.53');

    const deleteBtn = screen.getByRole('button', { name: /excluir/i });
    expect(deleteBtn).toBeInTheDocument();

    userEvent.click(deleteBtn);

    expect(deleteBtn).not.toBeInTheDocument();
    expect(displaySum).toHaveTextContent('0.00');
  });

  it('edita uma despesa se o botão for clicado', () => {
    const displaySum = screen.getByText(/despesa total:/i);
    const valueInput = screen.getByRole('spinbutton', { name: /valor/i });
    const editItemBtn = screen.getByRole('button', { name: /editar/i });
    const addBtn = screen.getByRole('button', { name: /adicionar despesa/i });
    const valueCell = screen.getAllByRole('cell');

    expect(displaySum).toHaveTextContent('47.53');
    expect(valueInput).toHaveValue(null);
    expect(editItemBtn).toBeInTheDocument();
    expect(addBtn).toBeInTheDocument();
    expect(valueCell[3]).toHaveTextContent('10.00');

    userEvent.click(editItemBtn);

    const editBtn = screen.getByRole('button', { name: /editar despesa/i });

    expect(editBtn).toBeInTheDocument();
    expect(valueInput).toHaveValue(null);

    userEvent.type(valueInput, '10');
    userEvent.click(editBtn);

    expect(valueCell[3]).toHaveTextContent('10.00');
  });
});

it('adiciona despesas à tabela quando o botão for clicado', async () => {
  const { store } = renderWithRouterAndRedux(<App />, { initialEntries: [walletPath] });
  const value = screen.getByRole('spinbutton', { name: /valor/i });
  const payMethod = screen.getByRole('combobox', { name: /método de pagamento/i });
  const addBtn = screen.getByRole('button', { name: /adicionar despesa/i });

  expect(addBtn).toBeInTheDocument();
  expect(value).toBeInTheDocument();
  expect(payMethod).toBeInTheDocument();

  userEvent.type(value, '40');
  fireEvent.change(payMethod, 'Cartão de crédito');
  userEvent.click(addBtn);

  await waitFor(() => expect(store.getState().wallet.expenses[0].value).toBe('40'));
  expect(value).toHaveValue(40);
});

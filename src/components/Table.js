import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, shape, func } from 'prop-types';
import { deleteExpense, setToEdit } from '../redux/actions';

class Table extends Component {
  handleRemove = ({ target }) => {
    const { expenses, dispatch } = this.props;

    const elementToDelete = expenses.filter(({ id }) => id !== Number(target.id));
    dispatch(deleteExpense(elementToDelete));
  };

  handleEdit = ({ target: { id } }) => {
    const { dispatch } = this.props;

    const elementToEdit = Number(id);
    dispatch(setToEdit(elementToEdit));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table className="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>

        <tbody>
          { expenses
            .map(({ id, description, tag, method, value, currency, exchangeRates }) => (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>{(value * exchangeRates[currency].ask).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    id={ id }
                    type="button"
                    onClick={ this.handleEdit }
                    className="button is-warning is-light is-small"
                  >
                    Editar
                  </button>

                  <button
                    id={ id }
                    type="button"
                    onClick={ this.handleRemove }
                    className="button is-danger is-light is-small"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

Table.propTypes = {
  expenses: arrayOf(shape()).isRequired,
  dispatch: func.isRequired,
};

export default connect(mapStateToProps)(Table);

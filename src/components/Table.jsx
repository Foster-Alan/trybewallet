import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, shape, func } from 'prop-types';
import { BsCashCoin, BsCoin, BsTags, BsFillTrashFill } from 'react-icons/bs';
import { MdOutlineDescription } from 'react-icons/md';
import { GiTrade } from 'react-icons/gi';
import { FaCoins } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import { deleteExpense, setToEdit } from '../redux/actions';
import '../Styles/Table.css';

class Table extends Component {
  handleClick = ({ target }) => {
    const { expenses, dispatch } = this.props;

    const elementToDelete = expenses.filter(({ id }) => id !== Number(target.id));
    dispatch(deleteExpense(elementToDelete));
  };

  handleEdit = (id) => {
    const { dispatch } = this.props;

    const elementToEdit = id;
    dispatch(setToEdit(elementToEdit));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table className="table-conteiner">
        <thead>
          <tr>
            <th>
              <MdOutlineDescription />
            </th>
            <th>
              <BsTags />
            </th>
            <th>
              <BsCashCoin />

            </th>
            <th>
              <BsCoin />
              </th>
            <th><FaCoins /></th>
            <th><GiTrade /></th>
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
                    className="edit-btn"
                    id={ id }
                    type="button"
                    onClick={ () => this.handleEdit(id) }
                    data-testid="edit-btn"
                  >
                    <AiFillEdit />
                  </button>
                  <button
                    className="delete-btn"
                    id={ id }
                    type="button"
                    data-testid="delete-btn"
                    onClick={ this.handleClick }
                  >
                    <BsFillTrashFill />
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

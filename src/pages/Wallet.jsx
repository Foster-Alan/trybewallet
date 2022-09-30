import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <WalletForm />
        <Table />
      </main>
    );
  }
}

export default Wallet;

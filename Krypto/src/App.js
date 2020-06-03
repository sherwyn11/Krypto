import React, { Component } from 'react';
import NavBar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter, Route } from 'react-router-dom';
import CreateTransaction from './components/CreateTransaction';
import PendingTransactions from './components/PendingTransactions';
import MyWallet from './components/MyWallet';
import Loader from './components/Loader';
import Blockchain from './blockchain-components/Blockchain';
import ViewTransactions from './components/ViewTransactions';
import { ec as EC } from 'elliptic';
const ec = new EC('secp256k1');

class App extends Component{
    
    constructor() {
        super();
        const blockchain = new Blockchain(2);
        const key = ec.genKeyPair();
        
        this.state = {
            loading: false,
            publicKey: key.getPublic('hex'),
            privateKey: key.getPrivate('hex'),
            key: key,
            chain: blockchain.chain,
            blockchain: blockchain,
            balance: [100]
        }
    }

    updateBalance = (balance) => {
        let bal = [...this.state.balance, balance];
        this.setState({
            balance: bal
        });
    }

    render(){
        if(this.state.loading === false){
            return (
                <BrowserRouter>
                    <div className="App">
                        <main>
                            <NavBar account={this.state.account}/>
                            <Route exact path = "/" component={(() => <Home blockchain={this.state.blockchain} />)} />
                            <Route exact path="/create-transaction" component={(() => <CreateTransaction blockchain={this.state.blockchain} publicKey={this.state.publicKey} privateKey={this.state.privateKey} myKey={this.state.key} updateMyBalance={this.updateBalance} balance={this.state.balance}/>)} />
                            <Route exact path="/pending-transactions" component={(() => <PendingTransactions blockchain={this.state.blockchain} publicKey={this.state.publicKey}/>)} />
                            <Route exact path="/my-wallet" component={(() => <MyWallet blockchain={this.state.blockchain} publicKey={this.state.publicKey} balance={this.state.balance}/>)} />
                            <Route exact path="/view-transactions/:id" component={ViewTransactions} />
                        </main>
                    </div>
                </BrowserRouter>
            );
        }else{
            return (
                <Loader></Loader>
            )
        }
    }
}

export default App;

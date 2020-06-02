import React, { Component } from 'react';
import Loader from './Loader';
import Transaction from '../blockchain-components/Transaction';
import { ec as EC } from 'elliptic';
const ec = new EC('secp256k1');


class CreateTransaction extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            recv_addr: null,
            amount: 0,
            blockchain: null,
            key: null,
            publicKey: null,
            privateKey: null,
            balance: 0    
        }
    }

    componentDidMount(){
        this.setState({
            blockchain: this.props.blockchain,
            key: this.props.myKey,
            publicKey: this.props.publicKey,
            privateKey: this.props.privateKey,
            loading: false,
            balance: this.props.balance[0]
        });
    }

    onsubmitForm = (e) => {
        e.preventDefault();
        if(this.state.amount <= this.state.balance){
            const priKey = ec.keyFromPrivate(this.state.privateKey);
            const tx = new Transaction(this.state.publicKey, this.state.recv_addr, this.state.amount);
            tx.signTxn(priKey);
            if(tx.isTxnValid()){
                this.state.blockchain.addTxn(tx);
                var myBal = this.state.blockchain.getBalance(this.state.publicKey);
                this.setState({ balance: myBal })
                console.log(this.state.blockchain.getPendingTxns());
                alert('Transaction created successfully!');
            }else{
                throw new Error('Error in txn!')
            }
            this.props.updateMyBalance(this.state.balance);
        }else{
            alert('Insufficient Funds! Try Mining some blocks to earn some Kryptos!')
        }
    }

    onchangeInput = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    render() {

        if(this.state.loading === false){
            return (
                <div className="container" style={{padding: 10, marginTop: 50}}>
                <form>
                    <div className="form-group">
                        <label className="text-dark" htmlFor="my_addr">Your address/public key</label>
                        <input type="text" className="form-control" value={this.state.publicKey} id="publicKey" onChange={this.onchangeInput} disabled/>
                    </div>
                    <div className="form-group">
                        <label className="text-dark" htmlFor="recv_addr">Receiver's address/public key</label>
                        <input type="text" className="form-control" id="recv_addr" onChange={this.onchangeInput}/>
                    </div>
                    <div className="form-group">
                        <label className="text-dark" htmlFor="amount">Amount of Kryptos to be transferred</label>
                        <input type="text" className="form-control" id="amount" onChange={this.onchangeInput}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.onsubmitForm}>Create Transaction</button>
                </form>
            </div>
            )
        }else{
            return(
                <Loader></Loader>
            )
        }
    }
}

export default CreateTransaction;
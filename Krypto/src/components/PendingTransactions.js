import React, { Component } from 'react';
import Loader from './Loader';

class PendingTransactions extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            blockchain: null,
            pendingTxns: [],
            publicKey: null,
        }
    }

    componentWillMount(){
        console.log(this.props)
        this.setState({
            blockchain: this.props.blockchain,
            pendingTxns: this.props.blockchain.getPendingTxns(),
            publicKey: this.props.publicKey,
            loading: false
        });
    }

    mineTxns = (e) => {
        e.preventDefault(); 
        if(this.state.blockchain.minePendingTxns(this.state.publicKey)){
            if(this.state.blockchain.isBlockchainValid()){
                alert('Block Mined!');
            }else{
                alert('Error in mining the block!');
            }
        }else{
            alert('Error in mining the block!');
        }
    }

    render() {
        const pendingTxnsList = this.state.pendingTxns.map(pendingTxn => {
            return(
                <tr key={this.state.pendingTxns.indexOf(pendingTxn)} style={{height: 100}}>
                    <td><p style={{wordBreak: "break-all"}}>{pendingTxn.from}</p></td>
                    <td>{pendingTxn.to}</td>
                    <td>{pendingTxn.amount}</td>
                    <td>{(pendingTxn.isTxnValid()).toString()}</td>
                </tr>
            )
        });
        if(this.state.loading === false){
            return(
                <div className="container">
                    <div className="table-responsive">
                        <table border="1" className="table" style={{marginTop: 20}}>
                            <thead>
                                <tr>
                                <th scope="col-xs-2">From</th>
                                <th scope="col-xs-2">To</th>
                                <th scope="col-xs-5">Amount</th>
                                <th scope="col-xs-3">Valid?</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {pendingTxnsList}
                            </tbody>
                        </table>
                        <div>
                            <button type="button" onClick={this.mineTxns} className="btn btn-primary">Mine Pending Transactions</button>
                        </div>
                    </div>
                </div>
            )
        }else{ 
            return(
                <Loader></Loader>
            )
        }
    }
}

export default PendingTransactions;
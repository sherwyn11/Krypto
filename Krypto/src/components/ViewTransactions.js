import React, { Component } from 'react';
import Loader from './Loader';

class ViewTransactions extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            blockchain: null,
            txns: [],
            publicKey: null,
        }
    }

    componentWillMount(){
        const blockchain = this.props.location.query.blockchain;
        this.setState({
            blockchain: this.props.location.query.blockchain,
            txns: blockchain[this.props.location.query.index].transactions,
            publicKey: this.props.publicKey,
            loading: false
        })
    }

    render() {
        const txnsList = this.state.txns.map(txn => {
            return(
                <tr key={this.state.txns.indexOf(txn)} style={{height: 100}}>
                    <td><p style={{wordBreak: "break-all"}}>{txn.from}</p></td>
                    <td>{txn.to}</td>
                    <td>{txn.amount}</td>
                    <td>{(txn.isTxnValid()).toString()}</td>
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
                                    {txnsList}
                            </tbody>
                        </table>
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

export default ViewTransactions;
import React, { Component } from 'react';
import Loader from './Loader';

class MyWallet extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            publicKey: null,
            blockchain: null,
            balance: null,
        }
    }

    componentWillMount() {
        this.setState({
            blockchain: this.props.blockchain,
            publicKey: this.props.publicKey,
            balance: this.props.blockchain.getBalance(this.props.publicKey, this.props.balance[0]),
            loading: false,
        })
    }

    render() {
        if(this.state.loading === false){
            return(
                <div className="jumbotron">
                    <h1 className="display-4">My Wallet</h1>
                    <p>You have <b>{this.state.balance} Kryptos in your account</b></p>
                    <i>You Public Key is: <b>{this.state.publicKey}</b></i>
                    <br></br>
                    <br></br>
                    <br></br>
                    <p className="lead">
                        <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                    </p>
                </div>
            )
        }else{
            return(
                <Loader></Loader>
            )
        }
    }
}

export default MyWallet;
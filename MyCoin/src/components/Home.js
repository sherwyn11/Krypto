import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Loader from './Loader';
import '../index.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            components: null,
            chain: null
        }
    }

    componentWillMount(){
        this.setState({
            loading: false,
            chain: this.props.blockchain.chain
        })
    }

    render() {
        if(this.state.loading === false){
            const blockList = this.state.chain.map(block => {
                return (
                    <div className="col-sm-3" key={block.index}>
                        <div className="card h-100 w-85" style={{background: '#333333'}}>
                            <div className="card-body bg-white text-dark">
                                <h5 className="card-title "><b className="text-warning">Block {block.index}</b></h5>
                                <p className="card-text"><b className="text-danger">Timestamp</b>  &nbsp;{block.timestamp}</p>
                                <p className="card-text"><b className="text-danger">Block Hash</b>  &nbsp;{block.hash}</p>
                                <p className="card-text"><b className="text-danger">Previous Block Hash</b>  &nbsp;{block.prevHash}</p>
                                <p className="card-text"><b className="text-danger">Nonce</b>  &nbsp;{block.nonce}</p>
                                <Link to={{pathname:'/view-transactions/' + block.index, query:{blockchain: this.state.chain, index: block.index}}}  className="btn btn-primary">View Transactions</Link>
                            </div>
                        </div>
                    </div>
                )
            })
            return(
                <div className="row" style={{marginTop: 10, padding: 10}}>
                    {blockList}
                </div> 
            );
        
        }else {
            return (
                <Loader></Loader>
            )
        }
    }
}

export default Home;
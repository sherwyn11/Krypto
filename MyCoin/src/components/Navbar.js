import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'


class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: "",
            identicon: null,
            loading: true, 
            account: this.props.account
        }
        
    }

    render(){
        if(this.props.location.pathname === "/signup" || this.props.location.pathname === "/login"){
            return ( 
                <nav className="navbar navbar-dark bg-dark">
                    <span className="navbar-brand mb-0 h1">MyCoin</span>
                </nav>
            )
        }else{
            return (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <NavLink className="navbar-brand" to="#"><b>MyCoin</b></NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/create-transaction">Create Transaction</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/pending-transactions">Pending Transactions</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/my-wallet">My wallet</NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            )
        }
    }
}

export default withRouter(Navbar)
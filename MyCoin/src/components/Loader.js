import React, {Component} from 'react';

class Loader extends Component {
    render(){
        return(
            <div className="container" style={{marginTop: 100, textAlign: "center"}}>
                <br></br>
                <br></br>
                <br></br>
                <div className="spinner-grow text-dark" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
}

export default Loader;
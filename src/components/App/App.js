import React, { Component } from 'react';
import './App.css';
import 'whatwg-fetch';
import TimeForm from '../TimeForm/TimeForm';

class App extends Component {
	constructor(props) {
		super(props);
        this.fetchCurrentTime = this.fetchCurrentTime.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);   

        this.state = {
            currentTime: null,
            tzone : 'PST',  
            msg: "now" 
        };
	}

    fetchCurrentTime = () =>{
        fetch( this.getApiUrl() )
            .then( resp => resp.json() )
            .then( resp => {
                const currentTime = resp.dateString;
                this.setState( {currentTime} );
            })
    }    
    getApiUrl = () =>{
        const { tzone, msg } = this.state;
        const host = 'https://andthetimeis.com';
        return host + '/' + tzone + '/' + msg + '.json';
    }
    handleFormSubmit = ( event ) =>{
        this.fetchCurrentTime();
    }
    handleChange = ( newState ) =>{ 
        this.setState( newState );
    }
    handleTime = () => {
        this.fetchCurrentTime();
        return this.state.currentTime;    
    }

  render() {
    const { currentTime, tzone } = this.state;
    const apiUrl =  this.getApiUrl();

    return (
        <div className="App">
            { !currentTime && 
                <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={ this.fetchCurrentTime }>
                        Get current time!!!
                </button>}
            { currentTime && <div>The current is : { this.handleTime() } </div>}
            <TimeForm
                onFormSubmit = { this.handleFormSubmit }
                onFormChange = { this.handleChange }
                tzone = { tzone }
                msg = { 'now' }
            />
            <p> We'll be making a request from: <code> { apiUrl } </code> </p>
        </div>  
    )};
  }

export default App;

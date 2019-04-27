import React, { Component } from 'react';
const zone = [ 'PST','MST','MDT','EST','UTC' ]

class TimeForm extends Component {
    constructor(props) {
        super(props);
        const { tzone, msg } = this.props;
        this.state = { tzone, msg };
    }

    _handleChange = (event) => {
    	typeof this.props.onFormChange === 'function' &&
    		this.props.onFormChange(this.state);
    }

    _changeTimeZone = (event)  => {
    	const tzone = event.target.value;
    	this.setState( { tzone }, this._handleChange );
    }

    _changeMsg = (event) => {
    	const msg = encodeURIComponent(event.target.value).replace(/%20/, '+');
    	this.setState( { msg }, this._handleChange );
    }

    _handleFormSubmit = (event) => {
    	event.preventDefault();
    	typeof this.props.onFormSubmit === 'funtion' &&
    		this.props.onFormSubmit( this.state );

    }

    render() {
    	const { tzone } = this.state;

        return (
        	<form onSubmit = { this._handleFormSubmit }>
        		<select
        			onChange = { this._changeTimeZone }
        			defaultValue = { tzone }>
        			{ zone.map(t => {
        				return <option key={ t } value={ t }> { t } </option>
        			})}
        		</select>
        		<input
        			type='text'
        			placeholder="A String ( such as 7 hours from now)"
        			onChange={ this._changeMsg } />
        		<input 
        			type="submit"
        			value="Update request"/>
        	</form>    	
        );
    }
}

export default TimeForm;

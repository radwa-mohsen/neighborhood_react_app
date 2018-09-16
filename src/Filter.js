import React, { Component } from 'react';
import './App.css';


class Filter extends Component {
    state = {
        query : ''
    }
    
	updateQuery = (query) => {
		this.setState({query})
	}

	clearQuery = () =>{
		this.setState({query:''})
	}
    render(){
        const {query} = this.state;
        return(
            <div className={this.props.className}>
                <div className="search-locations-bar">
                    <div className="search-location-input-wrapper">
                        <h2>Bart Locations</h2>
                        <form
                        onSubmit = {(e) => e.preventDefault()}
                        >
                            <input 
                                type="text" 
                                placeholder="Station Location"
                                value = {query}
                                onChange = {(event) => {this.updateQuery(event.target.value)}}
                            />
                            <button className="filter-btn">Filter</button>
                            
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Filter;
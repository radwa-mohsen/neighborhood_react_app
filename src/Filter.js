import React, { Component } from 'react';
import './App.css';
import MaterialIcon, {colorPalette} from 'material-icons-react';


class Filter extends Component {
    state = {
        query : '',
        className : "available-locations"
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
            <div className={this.state.className}>
               {/* <div className="container"> */}
        <div className="wrapper"><button  className="hamburger" onClick={()=>{
          if(this.state.className ==="available-locations"){
            this.setState({className:"hidden"})
          }else{
            this.setState({className:"available-locations"})
          }
         }}>&#9776;</button><span className="town">Alexandria</span>
        {/* </div> */}
        </div>
                <div className="search-locations-bar">
                    <div className="search-location-input-wrapper">
                        <h2>Bart Locations</h2>
                        <form
                        onSubmit = {(e) => e.preventDefault()}
                        >
                            <input 
                                className="filter-input"
                                type="text" 
                                placeholder="Station Location"
                                value = {query}
                                onChange = {(event) => {this.updateQuery(event.target.value)}}
                            />
                            

                            <button className="filter-btn"><span className="filter-name">Filter</span><MaterialIcon icon="filter_list" /></button>
                            
                        </form>
                    </div>
                </div>
                <div className="Filter-result">
                   <ol>
                       <li>place1</li>
                   </ol>
                </div>
            </div>
        );
    }
}

export default Filter;
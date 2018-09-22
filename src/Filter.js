import React, { Component } from 'react';
import './App.css';
import escapeRegExp from 'escape-string-regexp'
import MaterialIcon from 'material-icons-react';
class Filter extends Component {
    state = {
        query : '',
        className : "available-locations",
        locationsResult : this.props.locations
    }
    
	updateQuery = (query) => {
		this.setState({query})
	}

	clearQuery = () =>{
        this.setState({query:''})
    }
    //to update the list depends on the entered query
    updateFilter(query){
        let showingResults
        if(query.length !==0){
            const match = new RegExp(escapeRegExp(query),'i')
            showingResults = this.props.locations.filter((location) => match.test(location.title))
            this.setState(()=>({
                locationsResult : showingResults
            }))
            this.props.updateMarkers(showingResults)
        }
        else{
            this.setState(()=>({
                locationsResult : this.props.locations
            }))
            this.props.updateMarkers(this.props.locations)
            }
        }
    //to call the props which depends on open the infowindow of the chosen marker
    openContent = (loc)=>{
        this.props.openContent(loc)
    }

    render(){
        const {query} = this.state;
        const{locationsResult} = this.state;
      
        return(
            <div className={this.state.className}> 
                <div className="wrapper-hamburger">
                    <button aria-label="side menu" 
                            className="hamburger" 
                            onClick={()=>{
                                        if(this.state.className ==="available-locations"){
                                            this.setState({className:"hidden"})
                                        }else{
                                            this.setState({className:"available-locations"})
                                        }
                                    }}>&#9776;
                    </button>
                    <span className="town" 
                          tabIndex="0" 
                          aria-label="city name Alexandria"
                          role="heading"> Alexandria</span>
                </div>
                <div className="search-locations-bar">
                    {/* <div className="search-location-input-wrapper"> */}
                        <h2 tabIndex="0">Touristic Locations</h2>
                        <form
                            onSubmit = {(e) => e.preventDefault()}>
                            <input 
                                className="filter-input"
                                type="text" 
                                placeholder="Station Location"
                                value = {query}
                                onChange = {(event) => {this.updateQuery(event.target.value)
                                                       this.updateFilter(event.target.value)}} />                        
                        </form>
                    {/* </div> */}
                </div>
                <div className="Filter-result">
                   <ul>
                   {locationsResult.map((location)=>(
                        <li key={location.title}>
                            <span className="location-mark">
                                <i className="material-icons">location_on</i>
                            </span>
                            <a className="link" 
                               href="#" 
                               onClick={()=>{
                                             this.openContent(location.title)}} >{location.title}</a>
                        </li>
                     ))}
                   </ul>
                </div>
            </div>
        );
    }
}

export default Filter;
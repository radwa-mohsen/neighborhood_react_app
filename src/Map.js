import React, { Component } from 'react';
import './App.css';


class Map extends Component {

    
    
    render(){
        return(
            <div>
                <button>&#9776; Toggle Sidebar</button>
                <div ref="map"></div> 
            </div>
            
        );
    }
}

export default Map;
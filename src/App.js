import React, { Component } from 'react';
import './App.css';
import Filter from './Filter'
import Map from './Map'

class App extends Component {
  state = {
    className : "available-locations"
  }
  componentDidMount() {
    
    window.initMap = this.initMap;
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyC8BrGoFKycP9JDCkNHAqbQ5BXRCLnkFbk&v=3&callback=initMap')

  }
  
  
  initMap (){
    const google = window.google;
   let map;
   // let markers = [];
    map = new google.maps.Map(document.getElementById('map'),{
      center : {lat:31.099761 , lng : 29.770261},
      zoom :13
  });
}

  // var locations = [
  //   {title: "place1" ,location :{lat:31.101096 ,lng:29.771991 }},
  //   {title:"place2" ,location :{lat:31.100886 ,lng:29.775525 }},
  //   {title:"place3" ,location :{lat:  31.102839,lng:29.776232 }},
  //   {title: "place4",location :{lat:31.100986 ,lng: 29.773441}},
  //   {title: "place5",location :{lat: 31.102952,lng:29.778997  }},
  //   {title:"place6" ,location :{lat:  31.105748,lng:29.776991 }},
  //   {title: "place7",location :{lat: 31.105883,lng:29.783463 }}
  // ];
  // var largeInfowindow = new google.maps.InfoWindow();
  // var bounds = new google.maps.LatLngBounds();
  // for (let i = 0; i < locations.length; i++) {
  //   var position = locations[i].location;
  //   var title = locations[i].title;
  //   var marker = new google.maps.Marker({
  //       position:position,
  //       map:map,
  //       title:title,
  //       animation : google.maps.Animation.DROP,
  //       id:i
       
  //   })
  //   markers.push(marker);
    
  //   bounds.extend(marker.position);
  //   marker.addListener('click',function(){
  //       populateInfoWindow(this,largeInfowindow)
  //   })
  //   function populateInfoWindow (marker,infoWindow){
  //    if (infoWindow.marker != marker) {
  //        infoWindow.marker = marker;
  //        infoWindow.setContent('<div>' + marker.position + '</div>');
  //        infoWindow.open(map,marker);
  //        infoWindow.addListener('closeclick',function(){
  //            infoWindow.setContent(null)
  //        })
  //    }
  //   }
  // }
  // map.fitBounds(bounds);
  // }
  render() {
    return (
      <div className="App">
        <Filter className={this.state.className} />
        <div className="container">
        <div className="wrapper"><button  className="hamburger" onClick={()=>{
          if(this.state.className ==="available-locations"){
            this.setState({className:"hidden"})
          }else{
            this.setState({className:"available-locations"})
          }
         }}>&#9776;</button>
        </div>
        <div id="map">
        </div>
        </div>
        
      </div>
    );
  }
}

function loadJS(src) {
  var ref = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);

}
export default App;

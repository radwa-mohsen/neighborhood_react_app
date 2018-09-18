import React, { Component } from 'react';
import './App.css';
import Filter from './Filter'
import Map from './Map'

class App extends Component {
  state = {
    className : "available-locations",
    locations :[
      {title: "San Stifano" ,location :{lat:31.247011 ,lng:29.969717299999957 }},
      {title:"Al Agamy Al Bahri" ,location :{lat:31.0940819 ,lng:29.767780899999934 }},
      {title:"Montaza Palace" ,location :{lat:  31.2884965,lng:30.015969600000062 }},
      {title: "Bibliotheca Alexandrina",location :{lat:31.2088705 ,lng: 29.909201199999984}},
      {title: "Sidi Gabir",location :{lat: 31.22133479999999,lng:29.937915100000055  }},
      {title:"Sidi Bishr" ,location :{lat: 31.2555336,lng:29.98320000000001 }},
      {title: "DownTown Mall",location :{lat: 31.1684721,lng:29.936801599999967}}
    ]
  }
  componentDidMount() {
    
    window.initMap = this.initMap;
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyC8BrGoFKycP9JDCkNHAqbQ5BXRCLnkFbk&v=3&callback=initMap')

  }
  
  
  initMap = ()=>{
   
    const {locations} = this.state
    const google = window.google
   let map;
    let markers = [];
    map = new google.maps.Map(document.getElementById('map'),{
      center : {lat:30.9991934 , lng : 29.793309700000002},
      zoom :13
  });
 
  var largeInfowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();
  for (let i = 0; i < locations.length; i++) {
    var position = locations[i].location;
    var title = locations[i].title;
    var marker = new google.maps.Marker({
        position:position,
        map:map,
        title:title,
        animation : google.maps.Animation.DROP,
        id:i
       
    })
    markers.push(marker);
    
    bounds.extend(marker.position);
    marker.addListener('click',function(){
        populateInfoWindow(this,largeInfowindow)
    })
    function populateInfoWindow (marker,infoWindow){
     if (infoWindow.marker != marker) {
         infoWindow.marker = marker;
         infoWindow.setContent('<div>' + marker.position + '</div>');
         infoWindow.open(map,marker);
         infoWindow.addListener('closeclick',function(){
             infoWindow.setContent(null)
         })
     }
    }
  }
  map.fitBounds(bounds);
  }
  render() {
    return (
      <div className="App">
        <Filter className={this.state.className} />

        <div id="map">
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

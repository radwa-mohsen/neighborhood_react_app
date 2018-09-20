import React, { Component } from 'react';
import './App.css';
import Filter from './Filter' 

let chosenLocation = [];
let map;
let markers = [];
class App extends Component {
  state = {
    className : "available-locations",
    locations :[
      {title: "San Stifano Hotel" ,location :{lat:31.247011 ,lng:29.969717299999957 }},
      {title:"Agamy Star Mall" ,location :{lat:31.110298 ,lng:29.78775070000006 }},
      {title:"Montaza Palace" ,location :{lat:  31.2884965,lng:30.015969600000062 }},
      {title: "Bibliotheca Alexandrina",location :{lat:31.2088705 ,lng: 29.909201199999984}},
      {title: "City Square Mall",location :{lat: 31.2281625,lng:29.94211210000003}},
      {title:"Green Plaza Mall" ,location :{lat: 31.2066635,lng:29.965166899999986}},
      {title: "DownTown Mall",location :{lat: 31.1684721,lng:29.936801599999967}}
    ]
  }

  componentDidMount() {
    
    window.initMap = this.initMap;
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyC8BrGoFKycP9JDCkNHAqbQ5BXRCLnkFbk&v=3&callback=initMap')

  }
  
  initMap = ()=>{
    
    const {locations} = this.state
    //const {chosenLocation} = this.state
    const google = window.google
  let usedLocations


    map = new google.maps.Map(document.getElementById('map'),{
      center : {lat:30.9991934 , lng : 29.793309700000002},
      zoom :13
  });
 if(chosenLocation.length>0){
 usedLocations = chosenLocation
 }else{
   usedLocations = locations
 }
  var largeInfowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();
  for (let i = 0; i < usedLocations.length; i++) {
    var position = usedLocations[i].location;
    var title = usedLocations[i].title;
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
     if (infoWindow.marker !== marker) {
         infoWindow.marker = marker;
         infoWindow.setContent(`<div><a href="#">  ${marker.title}</a> </div>`);
         infoWindow.open(map,marker);
         infoWindow.addListener('closeclick',function(){
             infoWindow.setContent(null)
         })
     }
    }
  }
  map.fitBounds(bounds);
  }

  updateMarkers (showingResults) {
    chosenLocation = showingResults
    markers.map(marker=>marker.setMap(null))
    chosenLocation.map(loc=>
      markers.filter((marker)=>marker.title === loc.title)[0].setMap(map))
  
 
  }

  openContent = (location)=>{
    
    const google = window.google
   let chosenMarker = markers.filter((marker)=>marker.title === location)
   google.maps.event.trigger(chosenMarker[0], 'click');

  }
  render() {
    return (
      <div className="App">
        <Filter className={this.state.className} 
                locations = {this.state.locations} 
                updateMarkers={(showingResults)=>{this.updateMarkers(showingResults)}} 
                openContent={(loc)=>{this.openContent(loc)}}/>

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

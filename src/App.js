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
      {
        title: "Alexandria Opera House" ,
        location :{lat:31.19675264670403 ,lng:29.90200721772115 },
        venue_id:"4dcd8b71d164679b8ce935c3"
      },
      {
        title:"Citadel of Qaitbay" ,
        location :{lat:31.212945482937627 ,lng:29.884037201555333},
        venue_id:"4ca062acd3c2b60cb673dcbc"
      },
      {
        title:"Montaza Palace" ,
        location :{lat:31.288493334799238,lng:30.014485875619275 },
        venue_id:"501c8c3ae4b067f6ac7166a1"
      },
      {
        title: "Bibliotheca Alexandria",
        location :{lat:31.2088705 ,lng: 29.909201199999984},
        venue_id:"4bd5cd885631c9b6edbaa430"
      },
      
      {
        title: "Royal Jewelry Museum",
        location :{lat: 31.23913421499753,lng:29.96291810417218},
        venue_id:"4f53c281e4b033653577293d"
      },
      {
        title:"Green Plaza Mall" ,
        location :{lat: 31.206731838220897,lng:29.964734612113496},
        venue_id:"52dc1bed498ea9c9d5a148b2"},
      {
        title: "City Centre Mall",
        location :{lat: 31.168552010633217,lng:29.932185759584424},
        venue_id:"4b4b88f8f964a520769f26e3"
      }
    ]
  }

  componentDidMount() {
    
    window.initMap = this.initMap;
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyC8BrGoFKycP9JDCkNHAqbQ5BXRCLnkFbk&v=3&callback=initMap')

  }
  
  initMap = ()=>{
    
    const {locations} = this.state
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
    let populateInfoWindow = (marker,infoWindow)=>{
      const {locations} = this.state
      let location = locations.filter(loc=>loc.title === marker.title)
     if (infoWindow.marker !== marker) {
         infoWindow.marker = marker;
         let clientID = "5TKOPJNR2M5EWQAQK23IB4NU31SP1NYM2UBI13LOYAIVOIVA"
         let clientSecret = "OGVH2HFI3VGFWM2I5DG2MEO13P25133A5UERAX4SRDQTUGYT"
        //  let clientID = "ULJMAZZVQKOP0P54O1ZS1SJGFWTUGBC4DRPY4HQ24MHA1ZBR";
        //  let clientSecret ="YGKRI11UK20KMZQXO3XIYDTP0XEPHC2B5NHSYL34LWHD0CND";
         
         let url = "https://api.foursquare.com/v2/venues/"+ location[0].venue_id + "?client_id="+clientID +"&client_secret="+clientSecret+"&v=20130815"
         fetch(url).then((response)=>{
          if (response.status !== 200) {
            infoWindow.setContent(`<p  tabIndex="0">Sorry information about ${marker.title} can't be loaded .. please try again later<p>`);
            return;
        }
               response.json().then((info)=>{
                 
                 let venue = info.response.venue
                 let image = venue.bestPhoto
                 let imageURL = image.prefix + "100x100" + image.suffix
                 let name = venue.name
                 let address = venue.location.formattedAddress
                 let html = `<div class="content">
                              <div>
                                <h3  tabIndex="0">${name}</h3>
                                <p  tabIndex="0">${address}</p>
                                <a href="https://foursquare.com/v/${venue.id}" aria-label="Read more about ${name}">Read More</a>
                              </div>
                              <img src="${imageURL}" alt="${name}"/>
                            </div>`
                
                 infoWindow.setContent(html)
               })
         }).catch(()=>{
          infoWindow.setContent(`<p tabIndex="0">Sorry information about ${marker.title} can't be loaded<p>`);
         })
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

        <div id="map" tabIndex="0" aria-label="map of restaurant" role="application">
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

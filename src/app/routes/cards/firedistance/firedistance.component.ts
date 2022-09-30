import { Component, OnInit  } from "@angular/core";
import { OpenStreetMapProvider } from 'leaflet-geosearch';

import { DeckService } from '../../../services/cards/deck.service'
import { MONUMEN_NASIONAL_LAT_LNG } from "../../../../utils/const";
import { environment as env } from '../../../../environments/environment';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { lineString , length} from "@turf/turf";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-firedistance",
  templateUrl: "./firedistance.component.html",
  styleUrls: ["./firedistance.component.scss"]
})
export class FiredistanceComponent implements OnInit {
  private rootIconDir = "../../../assets/decks/fire/location";

  private informerMarker;
  private fireMarker;
  private map;
  private geojson;
  private distanceLine;
  private labelLayer;
  private provider;
  public search;
  searchResults

  constructor(private deckService: DeckService , public translate: TranslateService,) {}
  

  ngOnInit() {
    this.initMap();

    this.deckService.userCannotBack()
    this.isUserAbleToContinue()
  }

  isUserAbleToContinue() {
    if (!this.deckService.getLocation() && !this.deckService.getFireLocation()) {
      this.deckService.userCannotContinue()
    } else {
      this.deckService.userCanContinue()
    }
  }

  private initMap() {
    let { lat, lng } = MONUMEN_NASIONAL_LAT_LNG

    if (this.deckService.getFireLocation()) {
      lat = this.deckService.getLocation().lat
      lng = this.deckService.getLocation().lng
    }

    // const accessToken = 'pk.eyJ1IjoiaWxoYW13YWhhYmkiLCJhIjoiY2p5MGllYW96MDNoNjNobnF2cWh2c3dkZyJ9.Vfmf0KAT-gZBA4L2LF7PNg';
    
    // L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=${accessToken}`, {
    //   attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // }).addTo(this.map);

    // // Add compass
    // this.map.addControl(new L.Control.Compass());

    // // Check if there is any error (ex: user turn off geolocation)
    // this.checkGeolocation()

    // // Add locate
    // const locate = L.control.locate({ icon: 'locate', keepCurrentZoomLevel: true }).addTo(this.map);

    // if (this.deckService.getLocation()) this.onLocateFound()
    // else locate.start() // Locate user current location


    mapboxgl.accessToken = 'pk.eyJ1IjoicGV0YWJlbmNhbmEiLCJhIjoiY2s2MjF1cnZmMDlxdzNscWc5MGVoMTRkeCJ9.PGcoQqU6lBrcLfBmvTrWrQ';
    this.map = new mapboxgl.Map({
        container: 'mapid', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center:[lng , lat], // starting position [lng, lat]
        zoom: 16, // starting zoom
    });

    const self = this

    this.geojson = {
      'type': 'FeatureCollection',
      'features': []
      };
       
    
       
      this.map.on('load', () => {
      this.map.addSource('geojson', {
      'type': 'geojson',
      'data': this.geojson
      });
       
      this.map.addLayer({
      id: 'measure-lines',
      type: 'line',
      source: 'geojson',
      layout: {
      'line-cap': 'round',
      'line-join': 'round'
      },
      paint: {
      'line-color': 'red',
      'line-width': 2.5
      },
      filter: ['in', '$type', 'LineString']
      });
      self.onLocateFound()
    })

    // else locate.start() // Locate user current location

    // this.addMarker()

    this.provider = new OpenStreetMapProvider();
  }

  private checkGeolocation() {    
    const addMarkerAtMonas = () => {
      this.onLocateFound()
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.onLocateFound, addMarkerAtMonas);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  private onLocateFound(): void {
    this.addMarker("informer");
    this.addMarker("fire");
    this.addDistanceLine();
  }

  private countDistance(distanceInMeter): Number {
    const ceiledDistance = Math.ceil(distanceInMeter);

    let distanceInString;
    if (ceiledDistance >= 1000) {
      distanceInString = `${(ceiledDistance / 1000).toString()} km`;
    } else {
      distanceInString = `${ceiledDistance.toString()} m`;
    }

    return distanceInString;
  }

  private addDistanceLine(): void {
    if (this.distanceLine) {
      this.geojson.features.pop()
      this.map.getSource('geojson').setData(this.geojson)
    }
    if(this.labelLayer ) this.map.removeLayer('symbols')
    const lngLat = this.fireMarker.getLngLat()
    const infolngLat = this.informerMarker.getLngLat()

    var line = lineString([[lngLat.lng , lngLat.lat] , [infolngLat.lng , infolngLat.lat]]);
    var Linelength = length(line, {units: 'meters'});
    
      // Used to draw a line between points
      const linestring = {
        'type': 'Feature',
        'geometry': {
        'type': 'LineString',
        'coordinates': [[lngLat.lng , lngLat.lat] , [infolngLat.lng , infolngLat.lat]],
        }
        };
        this.labelLayer = this.map.addLayer({
          "id": "symbols",
          "type": "symbol",
          "source": "geojson",
          "layout": {
            "symbol-placement": "line-center",
            "text-font": ["Open Sans Regular"],
            "text-offset" : [0,1],
            "text-field": this.countDistance(Linelength), // part 2 of this is how to do it
            "text-size": 12.5
          }
        });
       this.geojson.features.push(linestring);
       this.distanceLine = this.map.getSource('geojson').setData(this.geojson);
  }

  private addMarker(type: "informer" | "fire" , LatLng = undefined): void {
    console.log(this.map.getCenter())
    let latlng;
    switch (type) {
      case "informer":
        latlng = {
          lat: LatLng  ? LatLng.lat : this.map.getCenter().lat,
          lng:  LatLng ? LatLng.lng : this.map.getCenter().lng
        };
        this.deckService.setLocation(latlng);
        break;
      case "fire":
        if (!this.deckService.getFireLocation()) {
          latlng = {
            lat: LatLng ? LatLng.lat : this.map.getCenter().lat,
            lng:  LatLng  ? LatLng.lng - LatLng.lng /100000  : this.map.getCenter().lng - this.map.getCenter().lng / 100000
          };
          this.deckService.setFireLocation(latlng);
        } else {
          latlng = this.deckService.getFireLocation()
        }
        break;
    }

    const imageElement = document.createElement('div');
    imageElement.className = 'marker';
    imageElement.style.backgroundImage = `url(${this.getIcon(type)})`;
    imageElement.style.width = `30px`;
    imageElement.style.height = `60px`;
    imageElement.style['margin-top'] = `-25px`;
    imageElement.style['background-repeat'] = 'no-repeat';
    imageElement.style.backgroundSize = '100%';
 
      // Add markers to the map.
      const marker = new mapboxgl.Marker({
        element : imageElement,
        draggable:true
      })
      .setLngLat([latlng.lng, latlng.lat])
      .addTo(this.map);

    switch (type) {
      case "informer":
        if (this.informerMarker) this.informerMarker.remove(this.map);
        this.informerMarker = marker;
        break;
      case "fire":
        if (this.fireMarker) this.fireMarker.remove(this.map);
        this.fireMarker = marker;
        console.log("adding marker informer fire")
        break;
    }

    // Adjust distance line between informer and fire
    marker.on("drag", () => {
      this.deckService.userCanContinue()
      switch (type) {
        case "informer":
          this.deckService.setLocation(this.informerMarker.getLngLat())
          break;
        case "fire":
          this.deckService.setFireLocation(this.fireMarker.getLngLat())
          break;
      }
      this.addDistanceLine();
    });

    // Not available on mapbox gljs (as on 26 Aug 2022) should update when available 

    // Change marker icon when drag and drop
    // change icon directly cause marker is not reactive so change opacity instead
    // not reactive = when doing drag, sometimes marker is left behind
    // marker.on("mouseover", () => {
    //   marker.setOpacity(1)
    // });
    // marker.on("moveend", () => {
    //   marker.setOpacity(0.75)
    // });
    // marker.on("mouseout", () => {
    //   marker.setOpacity(0.75)
    // });
  }

  async onSearch(query: string) {
    query = query + env.loc_search_suffix;
    const minimumCharCount = 3
    const results = query.split(',')[0].length > minimumCharCount && await this.provider.search({ query }) // Optimising the calls made to search api
    this.searchResults = results; //we send this to the child component search-location
  }

  async onConfirmSearch(query: string) {
    const results = await this.provider.search({ query });
    this.map.flyTo({
      center: [results[0].x, results[0].y],
      essential: true // this animation is considered essential with respect to prefers-reduced-motion
      });


    this.addMarker("informer" , {lat : results[0].y , lng : results[0].x});

    this.deckService.setFireLocation(null);
    this.addMarker("fire" , {lat : results[0].y , lng : results[0].x});
    
    this.addDistanceLine();
    
  }

  getIcon(type: 'informer' | 'fire') {
    return `${this.rootIconDir}/Select${type === "fire" ? "Fire" : ""}Location_Grey.png`
  }
}

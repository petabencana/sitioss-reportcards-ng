import { Component, OnInit } from '@angular/core';

import { DeckService } from '../../../services/cards/deck.service'
import { MONUMEN_NASIONAL_LAT_LNG } from '../../../../utils/const';
import { TranslateService } from '@ngx-translate/core';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { lineString , length} from "@turf/turf";
declare let L

@Component({
  selector: 'app-fireestimate',
  templateUrl: './fireestimate.component.html',
  styleUrls: ['./fireestimate.component.scss']
})
export class FireestimateComponent implements OnInit {
  private fireMarker
  private radiusMarker
  private geojson
  private circleRadius
  public latlng: { lat: string, lng: string }

  private map

  constructor(
    private deckService: DeckService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.initMap()

    this.deckService.userCanBack()
    this.isUserAbleToContinue()
  }

  isUserAbleToContinue() {
    if (!this.deckService.getFireRadius()) {
      this.deckService.userCannotContinue()
    } else {
      this.deckService.userCanContinue()
    }
  }

  private initMap(): void {
    let { lat, lng } = MONUMEN_NASIONAL_LAT_LNG;

    if (this.deckService.getFireLocation()) {
      lat = this.deckService.getFireLocation().lat
      lng = this.deckService.getFireLocation().lng
    }

    // this.map = L.map('mapid', { 
    //   center: [ lat, lng ],
    //   zoom: 16
    // });

    // const accessToken = 'pk.eyJ1IjoiaWxoYW13YWhhYmkiLCJhIjoiY2p5MGllYW96MDNoNjNobnF2cWh2c3dkZyJ9.Vfmf0KAT-gZBA4L2LF7PNg';
    
    // L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=${accessToken}`, {
    //   attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // }).addTo(this.map);

    // L.control.zoom({ position: 'bottomleft' })

    // this.map.addControl(new L.Control.Compass());

    // L.control.locate({ icon: 'locate' }).addTo(this.map);
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
      self.onLocateFound()
    })
  }

  private onLocateFound(): void {
    this.addFireMarker()
    this.addRadiusMarker()
    setTimeout(() => {
      this.addCircleRadius();
      }, 1000);
  }

  private addFireMarker() {
    const latlng = { lat: this.map.getCenter().lat, lng: this.map.getCenter().lng }

    const imageElement = document.createElement('div');
    imageElement.className = 'marker';
    imageElement.style.backgroundImage = `url(../../../assets/decks/fire/location/SelectFireLocation_Highlight.png)`;
    imageElement.style.width = `30px`;
    imageElement.style.height = `60px`;
    imageElement.style['background-repeat'] = 'no-repeat';
    imageElement.style.backgroundSize = '100%';
 
      // Add markers to the map.
      const marker = new mapboxgl.Marker({
        element : imageElement,
      })
      .setLngLat([latlng.lng, latlng.lat])
      .addTo(this.map);

    if (this.fireMarker) this.fireMarker.remove(this.map)
    this.fireMarker = marker

    // marker.addTo(this.map)
  }

  private addRadiusMarker() {
    let latlng;
    if (!this.deckService.getFireRadius()) {
      latlng = { lat: this.map.getCenter().lat, lng: this.map.getCenter().lng - this.map.getCenter().lng / 100000 }
    } else {
      latlng = this.deckService.getFireRadius()
    }

    const imageElement = document.createElement('div');
    imageElement.className = 'marker';
    imageElement.style.backgroundImage = `url(../../../assets/decks/fire/fireradius/FireAreaMarkerDrag.png)`;
    imageElement.style.width = `30px`;
    imageElement.style.height = `30px`;
    imageElement.style['margin-left'] = `-15px`;
    imageElement.style['background-repeat'] = 'no-repeat';
    imageElement.style.backgroundSize = '100%';
 
      // Add markers to the map.
      const marker = new mapboxgl.Marker({
        element : imageElement,
        draggable:true
      })
      .setLngLat([latlng.lng, latlng.lat])
      .addTo(this.map)

    if (this.radiusMarker) this.radiusMarker.remove(this.map)
    this.radiusMarker = marker

    marker.on('drag', () => {
      this.deckService.setFireRadius(marker.getLngLat())
      this.deckService.userCanContinue()
      this.addCircleRadius()
    })
  }

  private addCircleRadius(): void {
    if (this.circleRadius) {
      this.geojson.features.pop()
      this.map.getSource('geojson').setData(this.geojson)
      this.map.removeLayer('measure-radius')
      this.map.removeLayer('radius-label')
    }

       // Used to calculate radius between boints
       var line = lineString([[this.fireMarker.getLngLat().lng ,this.fireMarker.getLngLat().lat ] , [this.radiusMarker.getLngLat().lng ,this.radiusMarker.getLngLat().lat]]);
       var circleRadius = length(line, {units: 'meters'});
       this.deckService.setFireDistance(circleRadius)
       const circleLayer = {
        'type': 'Feature',
        'properties': {
          'description': `${this.fireRange} ${this.translate.instant('card.fireestimate.unit')}`,
          },
        'geometry': {
        'type': 'Point',
        'coordinates': [this.fireMarker.getLngLat().lng , this.fireMarker.getLngLat().lat],
        }
        };

        this.map.addLayer({
          'id': 'radius-label',
          'type': 'symbol',
          'source': 'geojson',
          'layout': {
          'text-field': ['get', 'description'],
          'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
          "text-offset" : [0 , 2.5],
          'text-justify': 'auto',
          "text-size": 13
          }
          });

        this.map.addLayer({
          'id': 'measure-radius',
          'type': 'circle',
          'source': 'geojson',
          'paint': {
          'circle-radius': circleRadius,
          'circle-opacity':0.3,
          'circle-color': '#B42222',
          },
          'filter': ['==', '$type', 'Point']
          });
       this.geojson.features.push(circleLayer);
       this.circleRadius = this.map.getSource('geojson').setData(this.geojson);

  }

  get fireRange() {
    const radius = this.deckService.getFireDistance()
    const range = Math.PI * Math.pow(radius, 2) / 10000
    
    return range.toFixed(2)
  }
}

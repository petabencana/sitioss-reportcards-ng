import { Component, OnInit } from '@angular/core';

import { DeckService } from '../../../services/cards/deck.service';
import { environment as env } from '../../../../environments/environment';

import { TranslateService } from '@ngx-translate/core';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss'],
})
export class RegionComponent implements OnInit {
  private geojson;
  public latlng: { lat: string; lng: string };
  regions: any = [];
  data: any = [];

  constructor(
    private deckService: DeckService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.initMap();
    this.deckService.userCannotBack();
    this.deckService.userCannotContinue()
  }

  private async initMap() {
    let { lat, lng } = env.default_location;
    const subscribed = await this.deckService.getSubscriptions();
    this.data = subscribed;
    this.regions = this.data.map(sub => sub.region);
    if (this.deckService.getFireLocation()) {
      lat = this.deckService.getFireLocation().lat;
      lng = this.deckService.getFireLocation().lng;
    }

    this.geojson = await this.getData();

    if (this.geojson.hasOwnProperty('features')) {
      mapboxgl.accessToken =
        'pk.eyJ1IjoicGV0YWJlbmNhbmEiLCJhIjoiY2s2MjF1cnZmMDlxdzNscWc5MGVoMTRkeCJ9.PGcoQqU6lBrcLfBmvTrWrQ';
      const map = new mapboxgl.Map({
        container: 'mapid', // container ID
        style: 'mapbox://styles/petabencana/ckq0nc6hp01vw17p9n17yxue2', // style URL
        center: [lng, lat],
        minZoom: 4,
        zoom: 8,
      });

      // Disable default box zooming.
      map.boxZoom.disable();

      const selectedFeatures = [];

      map.on('load', () => {
        const canvas = map.getCanvasContainer();
        // Variable to hold the starting xy coordinates
        // when `mousedown` occured.
        const self = this;
        map.addSource('cities', {
          type: 'geojson',
          data: this.geojson,
        });

        map.addLayer({
          id: 'cities',
          type: 'fill',
          source: 'cities',
          paint: {
            'fill-outline-color': 'red',
            'fill-color': 'rgba(0,0,0,0.1)',
          },
        });

        const subscribedCities = this.geojson.features.filter((feature) => {
          const res = this.regions.find((reg) => reg == feature.properties.region);
          return res !== undefined;
        });
        const subscribedRegionCodes = subscribedCities.map((feature) => feature.properties.region_code)
        if (this.regions.length > 0) {
          map.addLayer({
            id: 'cities-subscribed',
            type: 'fill',
            source: 'cities',
            paint: {
              'fill-outline-color': 'red',
              'fill-color': '#808080',
              'fill-opacity': 0.75
              ,
            },
            filter: ['in', 'region_code', ...subscribedRegionCodes],
          });
        }

        map.addLayer({
          id: 'cities-highlighted',
          type: 'fill',
          source: 'cities',
          paint: {
            'fill-outline-color': '#484896',
            'fill-color': '#6e599f',
            'fill-opacity': 0.75,
          },
          filter: ['in', 'region_code', ''],
        });

        document.addEventListener('touchstart', (e) => {
          map.on('touch', onClick.bind(this));
        }, { once: true });

        document.addEventListener('touchend', (e) => {
          map.off('touchend');
        });

        document.addEventListener('mousedown', (e) => {
          map.on('click', onClick.bind(this));
        }, { once: true });

        document.addEventListener('mouseup', (e) => {
          map.off('click');
        });

        function onClick(e) {
          const layerIds = map.getStyle().layers.map(layer => layer.id);
          const layersToQuery = ['cities', 'cities-subscribed'].filter(layer => layerIds.includes(layer));
          const features = map.queryRenderedFeatures(e.point, {
            layers: layersToQuery,
          });

          if (features[0].layer.id === 'cities-subscribed') {
            new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(this.translate.instant('card.region_popup'))
              .addTo(map)

          } else {
            // Check if any of the clicked features are already selected
            const clickedFeature = features.find((feature) =>
              selectedFeatures.find(
                (selectedFeature) =>
                  selectedFeature.properties.region_code ===
                  feature.properties.region_code
              )
            );

            if (clickedFeature) {
              // If clicked feature is already selected, deselect it
              const index = selectedFeatures.indexOf(clickedFeature);
              selectedFeatures.splice(index, 1);
            } else {
              // If clicked feature is not selected, add it to the selection
              selectedFeatures.push(...features);
            }

            if (features.length >= 1000) {
              return window.alert('Select a smaller number of features');
            }

            const uniqueFeatures = Array.from(
              new Set(
                selectedFeatures.map((feature) => feature.properties.region_code)
              )
            ).map((region_code) =>
              selectedFeatures.find(
                (feature) => feature.properties.region_code === region_code
              )
            );
            const regionCodes = uniqueFeatures.map(uniqueFeature => uniqueFeature.properties.region_code)
            const cities = uniqueFeatures.map(uniqueFeature => uniqueFeature.properties.region)
            this.deckService.setSelectedRegion(cities)
            this.deckService.setSelectedRegionCode(regionCodes);
            this.deckService.userCanContinue()
            map.setFilter('cities-highlighted', [
              'in',
              'region_code',
              ...uniqueFeatures.map((feature) => feature.properties.region_code),
            ]);
          }
        }
      });
    }
  }

  private getData() {
    return new Promise((resolve, reject) => {
      this.deckService
        .getRegionsData()
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject([]);
        });
    });
  }
}
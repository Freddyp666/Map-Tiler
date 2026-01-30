import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import * as maptilersdk from '@maptiler/sdk';
import { environment } from '../../../environments/environment.development';
import { DecimalPipe, JsonPipe } from '@angular/common';

maptilersdk.config.apiKey = environment.mapboxKey;

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [DecimalPipe, JsonPipe],
  templateUrl: './fullscreen-map-page.component.html',
  styles: `
  div{
    width: 100vw;
    height: calc(100vh - 64px);
  }
  #controls{
    background-color:white;
    padding: 10px;
    border-radius: 5px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: 1px solid #e2e8f0;
    width: 250px;
  }
  `,
})
export class FullscreenMapPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  zoom = signal(3);
  map = signal<maptilersdk.Map | null>(null);
  
  coordinates = signal({
    lng: -74.5,
    lat: 40,
  });



  zoomEffect = effect(() => {
    {
      if (!this.map()) return;
      this.map()!.setZoom(this.zoom());
      //this.map()?.zoomTo(this.zoom());
    }
  });

  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;
    const element = this.divElement()!.nativeElement;
    const { lng, lat } = this.coordinates();

    const map = new maptilersdk.Map({
      container: element, // container's id or the HTML element to render the map
      style: maptilersdk.MapStyle.STREETS,
      center: [lng, lat], // starting position [lng, lat]
      zoom: this.zoom(),
    });

    this.mapListeners(map);
  }

  mapListeners(map: maptilersdk.Map) {
    map.on('zoomend', (event) => {
      const newZoom = event.target.getZoom();
      this.zoom.set(newZoom);
    });

    map.on('moveend', (event) => {
      const center = map.getCenter();
      this.coordinates.set(center);
    });

    map.addControl(new maptilersdk.FullscreenControl());
    map.addControl(new maptilersdk.ScaleControl());

    this.map.set(map);
  }



}

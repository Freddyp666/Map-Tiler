import { AfterContentInit, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as maptilersdk from '@maptiler/sdk';
import { LngLat } from '@maptiler/sdk';

maptilersdk.config.apiKey = environment.mapboxKey;
interface Marker {
  id: string;
  maptilerMarker: maptilersdk.Marker;
}

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.component.html',
})
export class MiniMapComponent implements AfterContentInit {
  divElement = viewChild<ElementRef>('miniMap');
  zoom = signal(14);
  map = signal<maptilersdk.Map | null>(null);
  lngLat = input.required<{ lng: number; lat: number }>();
  // usamos signal en lugar de una variable normal
  isLoading = signal(true);

  async  ngAfterContentInit() {
    if (!this.divElement()?.nativeElement) return;
    const element = this.divElement()!.nativeElement;

    const map = new maptilersdk.Map({
      container: element, // container's id or the HTML element to render the map
      style: maptilersdk.MapStyle.STREETS,
      center: this.lngLat() , // starting position 
      zoom: this.zoom(),
      interactive: false,
    });

    new maptilersdk.Marker(
      { color: 'red' }
    ).setLngLat(this.lngLat()).addTo(map);

    // wait one second minimum before hiding the loader
    const minLoadTime = new Promise((resolve) => setTimeout(resolve, 500));

    // Wait for the map to load
    const mapLoaded = new Promise<void>((resolve) => {
      map.on('load', () => resolve());
    });

    // When both are done, hide the loader
    Promise.all([minLoadTime, mapLoaded]).then(() => {
      this.isLoading.set(false);
    });

  

    this.map.set(map);
  }
}

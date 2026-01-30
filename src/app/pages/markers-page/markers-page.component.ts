import { AfterContentInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import * as maptilersdk from '@maptiler/sdk';
import { LngLatLike } from '@maptiler/sdk';
import { environment } from '../../../environments/environment.development';
import { v4 as UUIDv4 } from 'uuid'
import { JsonPipe } from '@angular/common';

maptilersdk.config.apiKey = environment.mapboxKey;
interface Marker {
    id: string;
    maptilerMarker: maptilersdk.Marker;
}

@Component({
    selector: 'app-markers-page',
    imports: [],
    templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterContentInit {

    markers = signal<Marker[]>([]);
    divElement = viewChild<ElementRef>('map');
    zoom = signal(3);
    map = signal<maptilersdk.Map | null>(null);

    ngAfterContentInit(): void {
        if (!this.divElement()?.nativeElement) return;
        const element = this.divElement()!.nativeElement;


        const map = new maptilersdk.Map({
            container: element, // container's id or the HTML element to render the map
            style: maptilersdk.MapStyle.STREETS,
            center: [92.894825, 55.989061], // starting position [lng, lat] 
            zoom: 14,
        });

        map.on('styleimagemissing', () => { });
        /*
        const markermap = new maptilersdk.Marker({
          color: 'green',
          draggable: false,
        })
          .setLngLat([92.894825, 55.989061])
          .addTo(map);
    
        markermap.on('dragend', (event) => {
          console.log('Marker dragged to: ', markermap.getLngLat());
        });*/

        this.mapListeners(map);
    }

    mapListeners(map: maptilersdk.Map) {
        map.on('click', (event) => this.mapClick(event));
        this.map.set(map);
    }

    mapClick(event: maptilersdk.MapMouseEvent) {
        //if map is null return
        if (!this.map()) return;
        const map = this.map()!;

        //color generator ramdom
        const color = '#xxxxxx'.replace(/x/g, (y) =>
            ((Math.random() * 16) | 0).toString(16)
        );

        const coords = event.lngLat;

        const markermap = new maptilersdk.Marker({
            color: color,
        })
            .setLngLat(coords)
            .addTo(map);

        const newMarker: Marker = {
            id: UUIDv4(),
            maptilerMarker: markermap
        }

        this.markers.set([newMarker, ...this.markers()]);

    }

    flyToMarker(lngLat: LngLatLike) {
        if (!this.map()) return;

        this.map()?.flyTo({
            center: lngLat,
        })
    }

    formatCoords(lngLat: maptilersdk.LngLat) {
        const lng = lngLat.lng.toFixed(3);
        const lat = lngLat.lat.toFixed(3);
        return `Lat: ${lat}, Lng: ${lng}`;
    }

    deleteMarker(marker: Marker) {
        if (!this.map()) return;

        const map=this.map()!;
        marker.maptilerMarker.remove();
        this.markers.set(this.markers().filter(m => m.id !== marker.id));
    }

}

import { Component, signal } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { MiniMapComponent } from "../../maps/mini-map/mini-map.component";


interface HouseProperty {
  id: string;
  name: string;
  description: string;
  price: number;
  lngLat: { lng: number; lat: number };
  tags: string[];
}

@Component({
  selector: 'app-houses-page',
  imports: [MiniMapComponent],
  templateUrl: './houses-page.component.html',
})
export class HousesPageComponent {
  houses = signal<HouseProperty[]>([
    {
      id: uuid(),
      name: 'Villa Serenity',
      description:
        'A peaceful retreat with panoramic sea views and lush gardens.',
      price: 500_000,
      lngLat: { lng: -0.861526, lat: 41.65649 }, // Zaragoza, Spain
      tags: ['Villa', 'Sea', 'Gardens'],
    },
    {
      id: uuid(),
      name: 'Blue Lake House',
      description:
        'Located by a crystal-clear lake, perfect for relaxing and enjoying nature.',
      price: 420_000,
      lngLat: { lng: -72.1234, lat: -36.8201 }, // Chillán, Chile
      tags: ['Lake', 'Nature', 'Cabin'],
    },
    {
      id: uuid(),
      name: 'Central Penthouse',
      description:
        'Modern penthouse in the heart of the city, with stunning skyline views.',
      price: 380_000,
      lngLat: { lng: -3.70379, lat: 40.41678 }, // Madrid, Spain
      tags: ['City', 'Modern', 'Penthouse'],
    },
    {
      id: uuid(),
      name: 'El Sol Estate',
      description:
        'Spacious country estate surrounded by vineyards — the perfect rural escape.',
      price: 950_000,
      lngLat: { lng: -70.6693, lat: -33.4489 }, // Santiago, Chile
      tags: ['Estate', 'Vineyards', 'Countryside'],
    },
    {
      id: uuid(),
      name: 'Snowy Refuge',
      description:
        'A cozy mountain cabin surrounded by snow — ideal for winter getaways.',
      price: 320_000,
      lngLat: { lng: -106.8175, lat: 39.1911 }, // Aspen, USA
      tags: ['Mountain', 'Snow', 'Cabin'],
    },
    {
      id: uuid(),
      name: 'Atlantic Residence',
      description:
        'A sleek beachfront home with an infinity pool and direct ocean access.',
      price: 1_200_000,
      lngLat: { lng: -8.611, lat: 41.1496 }, // Porto, Portugal
      tags: ['Beach', 'Modern', 'Pool'],
    },
    {
      id: uuid(),
      name: 'Hidden Forest Cabin',
      description:
        'Nestled among tall pines, this secluded home offers complete privacy and peace.',
      price: 270_000,
      lngLat: { lng: -122.4194, lat: 37.7749 }, // San Francisco, USA
      tags: ['Forest', 'Nature', 'Secluded'],
    },
    {
      id: uuid(),
      name: 'Andes Lookout',
      description:
        'Home with breathtaking views of the Andes mountains and a warm fireplace.',
      price: 450_000,
      lngLat: { lng: -68.1193, lat: -16.4897 }, // La Paz, Bolivia
      tags: ['Mountain', 'View', 'Fireplace'],
    },
    {
      id: uuid(),
      name: 'Mediterranean Villa',
      description:
        'Inspired by Mediterranean architecture, with an inner courtyard and decorative fountains.',
      price: 670_000,
      lngLat: { lng: 2.1734, lat: 41.3851 }, // Barcelona, Spain
      tags: ['Mediterranean', 'Design', 'Villa'],
    },
    {
      id: uuid(),
      name: 'Desert House',
      description:
        'Minimalist and sustainable, surrounded by dunes and endless starry skies.',
      price: 310_000,
      lngLat: { lng: -115.1728, lat: 36.1147 }, // Las Vegas, USA
      tags: ['Desert', 'Modern', 'Sustainable'],
    },
  ]);


}

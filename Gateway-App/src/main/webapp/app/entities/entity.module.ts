import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'allocation-object',
        loadChildren: () =>
          import('./SmartParking/allocation-object/allocation-object.module').then(m => m.SmartParkingAllocationObjectModule)
      },
      {
        path: 'parking-facility',
        loadChildren: () => import('./SmartParking/parking-facility/parking-facility.module').then(m => m.SmartParkingParkingFacilityModule)
      },
      {
        path: 'parking-area',
        loadChildren: () => import('./SmartParking/parking-area/parking-area.module').then(m => m.SmartParkingParkingAreaModule)
      },
      {
        path: 'parking-spot',
        loadChildren: () => import('./SmartParking/parking-spot/parking-spot.module').then(m => m.SmartParkingParkingSpotModule)
      },
      {
        path: 'booking-parking',
        loadChildren: () => import('./SmartParking/booking/booking.module').then(m => m.SmartParkingBookingModule)
      },
      {
        path: 'car',
        loadChildren: () => import('./SmartParking/car/car.module').then(m => m.SmartParkingCarModule)
      },
      {
        path: 'learning-facility',
        loadChildren: () =>
          import('./SmartLernplatz/learning-facility/learning-facility.module').then(m => m.SmartLernplatzLearningFacilityModule)
      },
      {
        path: 'learning-area',
        loadChildren: () => import('./SmartLernplatz/learning-area/learning-area.module').then(m => m.SmartLernplatzLearningAreaModule)
      },
      {
        path: 'learning-spot',
        loadChildren: () => import('./SmartLernplatz/learning-spot/learning-spot.module').then(m => m.SmartLernplatzLearningSpotModule)
      },
      {
        path: 'booking-learning',
        loadChildren: () => import('./SmartLernplatz/booking/booking.module').then(m => m.SmartLernplatzBookingModule)
      },
      {
        path: 'user-history',
        loadChildren: () => import('./SmartLernplatz/user-history/user-history.module').then(m => m.SmartLernplatzUserHistoryModule)
      },
      {
        path: 'spot-history',
        loadChildren: () => import('./SmartLernplatz/spot-history/spot-history.module').then(m => m.SmartLernplatzSpotHistoryModule)
      },
      {
        path: 'occupancy-history',
        loadChildren: () =>
          import('./SmartLernplatz/occupancy-history/occupancy-history.module').then(m => m.SmartLernplatzOccupancyHistoryModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class GatewayAppEntityModule {}

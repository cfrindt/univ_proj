import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewayAppSharedModule } from 'app/shared/shared.module';
import { ParkingFacilityComponent } from './parking-facility.component';
import { ParkingFacilityDetailComponent } from './parking-facility-detail.component';
import { ParkingFacilityUpdateComponent } from './parking-facility-update.component';
import { ParkingFacilityDeleteDialogComponent } from './parking-facility-delete-dialog.component';
import { parkingFacilityRoute } from './parking-facility.route';

@NgModule({
  imports: [GatewayAppSharedModule, RouterModule.forChild(parkingFacilityRoute)],
  declarations: [
    ParkingFacilityComponent,
    ParkingFacilityDetailComponent,
    ParkingFacilityUpdateComponent,
    ParkingFacilityDeleteDialogComponent
  ],
  entryComponents: [ParkingFacilityDeleteDialogComponent]
})
export class SmartParkingParkingFacilityModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewayAppSharedModule } from 'app/shared/shared.module';
import { ParkingSpotComponent } from './parking-spot.component';
import { ParkingSpotDetailComponent } from './parking-spot-detail.component';
import { ParkingSpotUpdateComponent } from './parking-spot-update.component';
import { ParkingSpotDeleteDialogComponent } from './parking-spot-delete-dialog.component';
import { parkingSpotRoute } from './parking-spot.route';

@NgModule({
  imports: [GatewayAppSharedModule, RouterModule.forChild(parkingSpotRoute)],
  declarations: [ParkingSpotComponent, ParkingSpotDetailComponent, ParkingSpotUpdateComponent, ParkingSpotDeleteDialogComponent],
  entryComponents: [ParkingSpotDeleteDialogComponent]
})
export class SmartParkingParkingSpotModule {}

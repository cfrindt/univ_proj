import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewayAppSharedModule } from 'app/shared/shared.module';
import { ParkingAreaComponent } from './parking-area.component';
import { ParkingAreaDetailComponent } from './parking-area-detail.component';
import { ParkingAreaUpdateComponent } from './parking-area-update.component';
import { ParkingAreaAllOfFacilityComponent} from "app/entities/SmartParking/parking-area/parking-area-allOfFacility.component";
import { ParkingAreaDeleteDialogComponent } from './parking-area-delete-dialog.component';
import { parkingAreaRoute } from './parking-area.route';

@NgModule({
  imports: [GatewayAppSharedModule, RouterModule.forChild(parkingAreaRoute)],
  declarations: [ParkingAreaComponent, ParkingAreaDetailComponent, ParkingAreaUpdateComponent, ParkingAreaDeleteDialogComponent, ParkingAreaAllOfFacilityComponent],
  entryComponents: [ParkingAreaDeleteDialogComponent]
})
export class SmartParkingParkingAreaModule {}

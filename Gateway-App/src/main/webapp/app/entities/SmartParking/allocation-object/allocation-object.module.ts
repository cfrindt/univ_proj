import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewayAppSharedModule } from 'app/shared/shared.module';
import { AllocationObjectComponent } from './allocation-object.component';
import { AllocationObjectDetailComponent } from './allocation-object-detail.component';
import { AllocationObjectUpdateComponent } from './allocation-object-update.component';
import { AllocationObjectDeleteDialogComponent } from './allocation-object-delete-dialog.component';
import { allocationObjectRoute } from './allocation-object.route';

@NgModule({
  imports: [GatewayAppSharedModule, RouterModule.forChild(allocationObjectRoute)],
  declarations: [
    AllocationObjectComponent,
    AllocationObjectDetailComponent,
    AllocationObjectUpdateComponent,
    AllocationObjectDeleteDialogComponent
  ],
  entryComponents: [AllocationObjectDeleteDialogComponent]
})
export class SmartParkingAllocationObjectModule {}

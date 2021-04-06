import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewayAppSharedModule } from 'app/shared/shared.module';
import { OccupancyHistoryComponent } from './occupancy-history.component';
import { OccupancyHistoryDetailComponent } from './occupancy-history-detail.component';
import { OccupancyHistoryUpdateComponent } from './occupancy-history-update.component';
import { OccupancyHistoryDeleteDialogComponent } from './occupancy-history-delete-dialog.component';
import { occupancyHistoryRoute } from './occupancy-history.route';

@NgModule({
  imports: [GatewayAppSharedModule, RouterModule.forChild(occupancyHistoryRoute)],
  declarations: [
    OccupancyHistoryComponent,
    OccupancyHistoryDetailComponent,
    OccupancyHistoryUpdateComponent,
    OccupancyHistoryDeleteDialogComponent
  ],
  entryComponents: [OccupancyHistoryDeleteDialogComponent]
})
export class SmartLernplatzOccupancyHistoryModule {}

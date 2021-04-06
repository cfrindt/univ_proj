import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewayAppSharedModule } from 'app/shared/shared.module';
import { SpotHistoryComponent } from './spot-history.component';
import { SpotHistoryDetailComponent } from './spot-history-detail.component';
import { SpotHistoryUpdateComponent } from './spot-history-update.component';
import { SpotHistoryDeleteDialogComponent } from './spot-history-delete-dialog.component';
import { spotHistoryRoute } from './spot-history.route';

@NgModule({
  imports: [GatewayAppSharedModule, RouterModule.forChild(spotHistoryRoute)],
  declarations: [SpotHistoryComponent, SpotHistoryDetailComponent, SpotHistoryUpdateComponent, SpotHistoryDeleteDialogComponent],
  entryComponents: [SpotHistoryDeleteDialogComponent]
})
export class SmartLernplatzSpotHistoryModule {}

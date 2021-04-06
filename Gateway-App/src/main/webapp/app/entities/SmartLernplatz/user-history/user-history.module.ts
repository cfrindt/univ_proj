import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewayAppSharedModule } from 'app/shared/shared.module';
import { UserHistoryComponent } from './user-history.component';
import { UserHistoryDetailComponent } from './user-history-detail.component';
import { UserHistoryUpdateComponent } from './user-history-update.component';
import { UserHistoryDeleteDialogComponent } from './user-history-delete-dialog.component';
import { userHistoryRoute } from './user-history.route';

@NgModule({
  imports: [GatewayAppSharedModule, RouterModule.forChild(userHistoryRoute)],
  declarations: [UserHistoryComponent, UserHistoryDetailComponent, UserHistoryUpdateComponent, UserHistoryDeleteDialogComponent],
  entryComponents: [UserHistoryDeleteDialogComponent]
})
export class SmartLernplatzUserHistoryModule {}

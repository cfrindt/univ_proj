import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewayAppSharedModule } from 'app/shared/shared.module';
import { LearningAreaComponent } from './learning-area.component';
import { LearningAreaDetailComponent } from './learning-area-detail.component';
import { LearningAreaUpdateComponent } from './learning-area-update.component';
import { LearningAreaDeleteDialogComponent } from './learning-area-delete-dialog.component';
import { learningAreaRoute } from './learning-area.route';

@NgModule({
  imports: [GatewayAppSharedModule, RouterModule.forChild(learningAreaRoute)],
  declarations: [LearningAreaComponent, LearningAreaDetailComponent, LearningAreaUpdateComponent, LearningAreaDeleteDialogComponent],
  entryComponents: [LearningAreaDeleteDialogComponent]
})
export class SmartLernplatzLearningAreaModule {}

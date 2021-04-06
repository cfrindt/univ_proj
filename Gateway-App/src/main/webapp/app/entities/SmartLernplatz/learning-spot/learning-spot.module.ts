import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewayAppSharedModule } from 'app/shared/shared.module';
import { LearningSpotComponent } from './learning-spot.component';
import { LearningSpotDetailComponent } from './learning-spot-detail.component';
import { LearningSpotUpdateComponent } from './learning-spot-update.component';
import { LearningSpotDeleteDialogComponent } from './learning-spot-delete-dialog.component';
import { learningSpotRoute } from './learning-spot.route';

@NgModule({
  imports: [GatewayAppSharedModule, RouterModule.forChild(learningSpotRoute)],
  declarations: [LearningSpotComponent, LearningSpotDetailComponent, LearningSpotUpdateComponent, LearningSpotDeleteDialogComponent],
  entryComponents: [LearningSpotDeleteDialogComponent]
})
export class SmartLernplatzLearningSpotModule {}

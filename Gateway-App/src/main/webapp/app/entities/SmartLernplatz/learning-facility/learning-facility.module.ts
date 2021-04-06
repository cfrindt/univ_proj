import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewayAppSharedModule } from 'app/shared/shared.module';
import { LearningFacilityComponent } from './learning-facility.component';
import { LearningFacilityDetailComponent } from './learning-facility-detail.component';
import { LearningFacilityUpdateComponent } from './learning-facility-update.component';
import { LearningFacilityDeleteDialogComponent } from './learning-facility-delete-dialog.component';
import { learningFacilityRoute } from './learning-facility.route';

@NgModule({
  imports: [GatewayAppSharedModule, RouterModule.forChild(learningFacilityRoute)],
  declarations: [
    LearningFacilityComponent,
    LearningFacilityDetailComponent,
    LearningFacilityUpdateComponent,
    LearningFacilityDeleteDialogComponent
  ],
  entryComponents: [LearningFacilityDeleteDialogComponent]
})
export class SmartLernplatzLearningFacilityModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmartLernplatzRoutingModule } from './smart-lernplatz-routing.module';
import { LernplatzIndexComponent } from './lernplatz-index/lernplatz-index.component';
import { LearningOverviewComponent } from './learning-overview/learning-overview.component';
import { CurrentBookingComponent } from './current-booking/current-booking.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LearningSpotsOverviewComponent } from 'app/smart-lernplatz/learning-spots-overview/learning-spots-overview.component';
import { LearningAnalyticsComponent } from './learning-analytics/learning-analytics.component';
import { OccupancyComponent } from './occupancy/occupancy.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    LernplatzIndexComponent,
    LearningOverviewComponent,
    CurrentBookingComponent,
    LearningSpotsOverviewComponent,
    LearningAnalyticsComponent,
    OccupancyComponent
  ],
  imports: [CommonModule, SmartLernplatzRoutingModule, FontAwesomeModule, ReactiveFormsModule, NgbAccordionModule]
})
export class SmartLernplatzModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParkingManagementRoutingModule } from './parking-management-routing.module';
import { ParkingIndexComponent } from './parking-index/parking-index.component';
import { ParkingReservationComponent } from 'app/parking-management/parking-reservation/parking-reservation.component';
import { CarRegistrationComponent } from 'app/parking-management/car-registration/car-registration.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ParkingBookingComponent } from './parking-booking/parking-booking.component';
import { FacilityOverviewComponent } from './facility-overview/facility-overview.component';
import { CarManagementComponent } from './car-management/car-management.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CostOverviewComponent } from 'app/parking-management/cost-overview/cost-overview.component';
import { ParkingAdminComponent } from './parking-admin/parking-admin.component';
import { OverviewReservationComponent } from './facility-overview/overview-reservation/overview-reservation.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ParkingIndexComponent,
    ParkingReservationComponent,
    CarRegistrationComponent,
    ParkingBookingComponent,
    FacilityOverviewComponent,
    CarManagementComponent,
    CostOverviewComponent,
    ParkingAdminComponent,
    OverviewReservationComponent
  ],
  imports: [CommonModule, ParkingManagementRoutingModule, FontAwesomeModule, ReactiveFormsModule, NgbAccordionModule]
})
export class ParkingManagementModule {}

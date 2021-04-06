import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkingIndexComponent } from 'app/parking-management/parking-index/parking-index.component';
import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ParkingReservationComponent } from 'app/parking-management/parking-reservation/parking-reservation.component';
import { ParkingBookingComponent } from 'app/parking-management/parking-booking/parking-booking.component';
import { FacilityOverviewComponent } from 'app/parking-management/facility-overview/facility-overview.component';
import { CarManagementComponent } from 'app/parking-management/car-management/car-management.component';
import { CostOverviewComponent } from 'app/parking-management/cost-overview/cost-overview.component';
import { ParkingAdminComponent } from 'app/parking-management/parking-admin/parking-admin.component';

const routes: Routes = [
  {
    path: '',
    component: ParkingIndexComponent,
    data: {
      authorities: [Authority.USER]
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'reservation',
    component: ParkingReservationComponent,
    data: {
      authorities: [Authority.USER]
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'car-registration',
    component: ParkingReservationComponent,
    data: {
      authorities: [Authority.USER]
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'booking',
    component: ParkingBookingComponent,
    data: {
      authorities: [Authority.USER]
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'facility-overview',
    component: FacilityOverviewComponent,
    data: {
      authorities: [Authority.USER]
    },
    canActivate: [UserRouteAccessService]
  },

  {
    path: 'car-management',
    component: CarManagementComponent,
    data: {
      authorities: [Authority.USER]
    },
    canActivate: [UserRouteAccessService]
  },

  {
    path: 'cost-overview',
    component: CostOverviewComponent,
    data: {
      authorities: [Authority.USER]
    },
    canActivate: [UserRouteAccessService]
  },

  {
    path: 'parking-admin',
    component: ParkingAdminComponent,
    data: {
      authorities: [Authority.USER]
    },
    canActivate: [UserRouteAccessService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParkingManagementRoutingModule {}

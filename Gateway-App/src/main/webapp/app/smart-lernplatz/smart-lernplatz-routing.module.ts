import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LernplatzIndexComponent } from 'app/smart-lernplatz/lernplatz-index/lernplatz-index.component';
import { LearningOverviewComponent } from 'app/smart-lernplatz/learning-overview/learning-overview.component';
import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { CurrentBookingComponent } from 'app/smart-lernplatz/current-booking/current-booking.component';
import { LearningSpotsOverviewComponent } from 'app/smart-lernplatz/learning-spots-overview/learning-spots-overview.component';
import { LearningAnalyticsComponent } from 'app/smart-lernplatz/learning-analytics/learning-analytics.component';
import { OccupancyComponent } from 'app/smart-lernplatz/occupancy/occupancy.component';

const routes: Routes = [
  {
    path: '',
    component: LernplatzIndexComponent,
    data: {
      authorities: [Authority.USER]
    },
    canActivate: [UserRouteAccessService]
  },

  {
    path: 'overview',
    component: LearningOverviewComponent,
    data: {
      authorities: [Authority.USER]
    },
    canActivate: [UserRouteAccessService]
  },

  {
    path: 'current-booking',
    component: CurrentBookingComponent,
    data: {
      authorities: [Authority.USER]
    },
    canActivate: [UserRouteAccessService]
  },

  {
    path: 'learning-spots-overview',
    component: LearningSpotsOverviewComponent,
    data: {
      authorities: [Authority.USER]
    },
    canActivate: [UserRouteAccessService]
  },

  {
    path: 'learning-analytics',
    component: LearningAnalyticsComponent,
    data: {
      authorities: [Authority.USER]
    },
    canActivate: [UserRouteAccessService]
  },

  {
    path: 'occupancy',
    component: OccupancyComponent,
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
export class SmartLernplatzRoutingModule {}

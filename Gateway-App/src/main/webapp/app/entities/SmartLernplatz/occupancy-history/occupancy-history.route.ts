import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IOccupancyHistory, OccupancyHistory } from 'app/shared/model/SmartLernplatz/occupancy-history.model';
import { OccupancyHistoryService } from './occupancy-history.service';
import { OccupancyHistoryComponent } from './occupancy-history.component';
import { OccupancyHistoryDetailComponent } from './occupancy-history-detail.component';
import { OccupancyHistoryUpdateComponent } from './occupancy-history-update.component';

@Injectable({ providedIn: 'root' })
export class OccupancyHistoryResolve implements Resolve<IOccupancyHistory> {
  constructor(private service: OccupancyHistoryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOccupancyHistory> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((occupancyHistory: HttpResponse<OccupancyHistory>) => {
          if (occupancyHistory.body) {
            return of(occupancyHistory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new OccupancyHistory());
  }
}

export const occupancyHistoryRoute: Routes = [
  {
    path: '',
    component: OccupancyHistoryComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'OccupancyHistories'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OccupancyHistoryDetailComponent,
    resolve: {
      occupancyHistory: OccupancyHistoryResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'OccupancyHistories'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OccupancyHistoryUpdateComponent,
    resolve: {
      occupancyHistory: OccupancyHistoryResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'OccupancyHistories'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OccupancyHistoryUpdateComponent,
    resolve: {
      occupancyHistory: OccupancyHistoryResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'OccupancyHistories'
    },
    canActivate: [UserRouteAccessService]
  }
];

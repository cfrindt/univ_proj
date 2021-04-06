import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISpotHistory, SpotHistory } from 'app/shared/model/SmartLernplatz/spot-history.model';
import { SpotHistoryService } from './spot-history.service';
import { SpotHistoryComponent } from './spot-history.component';
import { SpotHistoryDetailComponent } from './spot-history-detail.component';
import { SpotHistoryUpdateComponent } from './spot-history-update.component';

@Injectable({ providedIn: 'root' })
export class SpotHistoryResolve implements Resolve<ISpotHistory> {
  constructor(private service: SpotHistoryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISpotHistory> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((spotHistory: HttpResponse<SpotHistory>) => {
          if (spotHistory.body) {
            return of(spotHistory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SpotHistory());
  }
}

export const spotHistoryRoute: Routes = [
  {
    path: '',
    component: SpotHistoryComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'SpotHistories'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SpotHistoryDetailComponent,
    resolve: {
      spotHistory: SpotHistoryResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'SpotHistories'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SpotHistoryUpdateComponent,
    resolve: {
      spotHistory: SpotHistoryResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'SpotHistories'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SpotHistoryUpdateComponent,
    resolve: {
      spotHistory: SpotHistoryResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'SpotHistories'
    },
    canActivate: [UserRouteAccessService]
  }
];

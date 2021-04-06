import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUserHistory, UserHistory } from 'app/shared/model/SmartLernplatz/user-history.model';
import { UserHistoryService } from './user-history.service';
import { UserHistoryComponent } from './user-history.component';
import { UserHistoryDetailComponent } from './user-history-detail.component';
import { UserHistoryUpdateComponent } from './user-history-update.component';

@Injectable({ providedIn: 'root' })
export class UserHistoryResolve implements Resolve<IUserHistory> {
  constructor(private service: UserHistoryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserHistory> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((userHistory: HttpResponse<UserHistory>) => {
          if (userHistory.body) {
            return of(userHistory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UserHistory());
  }
}

export const userHistoryRoute: Routes = [
  {
    path: '',
    component: UserHistoryComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'UserHistories'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UserHistoryDetailComponent,
    resolve: {
      userHistory: UserHistoryResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'UserHistories'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UserHistoryUpdateComponent,
    resolve: {
      userHistory: UserHistoryResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'UserHistories'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UserHistoryUpdateComponent,
    resolve: {
      userHistory: UserHistoryResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'UserHistories'
    },
    canActivate: [UserRouteAccessService]
  }
];

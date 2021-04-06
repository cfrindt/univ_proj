import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILearningSpot, LearningSpot } from 'app/shared/model/SmartLernplatz/learning-spot.model';
import { LearningSpotService } from './learning-spot.service';
import { LearningSpotComponent } from './learning-spot.component';
import { LearningSpotDetailComponent } from './learning-spot-detail.component';
import { LearningSpotUpdateComponent } from './learning-spot-update.component';

@Injectable({ providedIn: 'root' })
export class LearningSpotResolve implements Resolve<ILearningSpot> {
  constructor(private service: LearningSpotService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILearningSpot> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((learningSpot: HttpResponse<LearningSpot>) => {
          if (learningSpot.body) {
            return of(learningSpot.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LearningSpot());
  }
}

export const learningSpotRoute: Routes = [
  {
    path: '',
    component: LearningSpotComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'LearningSpots'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LearningSpotDetailComponent,
    resolve: {
      learningSpot: LearningSpotResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'LearningSpots'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LearningSpotUpdateComponent,
    resolve: {
      learningSpot: LearningSpotResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'LearningSpots'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LearningSpotUpdateComponent,
    resolve: {
      learningSpot: LearningSpotResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'LearningSpots'
    },
    canActivate: [UserRouteAccessService]
  }
];

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILearningFacility, LearningFacility } from 'app/shared/model/SmartLernplatz/learning-facility.model';
import { LearningFacilityService } from './learning-facility.service';
import { LearningFacilityComponent } from './learning-facility.component';
import { LearningFacilityDetailComponent } from './learning-facility-detail.component';
import { LearningFacilityUpdateComponent } from './learning-facility-update.component';

@Injectable({ providedIn: 'root' })
export class LearningFacilityResolve implements Resolve<ILearningFacility> {
  constructor(private service: LearningFacilityService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILearningFacility> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((learningFacility: HttpResponse<LearningFacility>) => {
          if (learningFacility.body) {
            return of(learningFacility.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LearningFacility());
  }
}

export const learningFacilityRoute: Routes = [
  {
    path: '',
    component: LearningFacilityComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'LearningFacilities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LearningFacilityDetailComponent,
    resolve: {
      learningFacility: LearningFacilityResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'LearningFacilities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LearningFacilityUpdateComponent,
    resolve: {
      learningFacility: LearningFacilityResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'LearningFacilities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LearningFacilityUpdateComponent,
    resolve: {
      learningFacility: LearningFacilityResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'LearningFacilities'
    },
    canActivate: [UserRouteAccessService]
  }
];

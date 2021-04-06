import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILearningArea, LearningArea } from 'app/shared/model/SmartLernplatz/learning-area.model';
import { LearningAreaService } from './learning-area.service';
import { LearningAreaComponent } from './learning-area.component';
import { LearningAreaDetailComponent } from './learning-area-detail.component';
import { LearningAreaUpdateComponent } from './learning-area-update.component';

@Injectable({ providedIn: 'root' })
export class LearningAreaResolve implements Resolve<ILearningArea> {
  constructor(private service: LearningAreaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILearningArea> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((learningArea: HttpResponse<LearningArea>) => {
          if (learningArea.body) {
            return of(learningArea.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LearningArea());
  }
}

export const learningAreaRoute: Routes = [
  {
    path: '',
    component: LearningAreaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'LearningAreas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LearningAreaDetailComponent,
    resolve: {
      learningArea: LearningAreaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'LearningAreas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LearningAreaUpdateComponent,
    resolve: {
      learningArea: LearningAreaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'LearningAreas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LearningAreaUpdateComponent,
    resolve: {
      learningArea: LearningAreaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'LearningAreas'
    },
    canActivate: [UserRouteAccessService]
  }
];

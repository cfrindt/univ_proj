import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAllocationObject, AllocationObject } from 'app/shared/model/SmartParking/allocation-object.model';
import { AllocationObjectService } from './allocation-object.service';
import { AllocationObjectComponent } from './allocation-object.component';
import { AllocationObjectDetailComponent } from './allocation-object-detail.component';
import { AllocationObjectUpdateComponent } from './allocation-object-update.component';

@Injectable({ providedIn: 'root' })
export class AllocationObjectResolve implements Resolve<IAllocationObject> {
  constructor(private service: AllocationObjectService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAllocationObject> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((allocationObject: HttpResponse<AllocationObject>) => {
          if (allocationObject.body) {
            return of(allocationObject.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AllocationObject());
  }
}

export const allocationObjectRoute: Routes = [
  {
    path: '',
    component: AllocationObjectComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AllocationObjects'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AllocationObjectDetailComponent,
    resolve: {
      allocationObject: AllocationObjectResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AllocationObjects'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AllocationObjectUpdateComponent,
    resolve: {
      allocationObject: AllocationObjectResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AllocationObjects'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AllocationObjectUpdateComponent,
    resolve: {
      allocationObject: AllocationObjectResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AllocationObjects'
    },
    canActivate: [UserRouteAccessService]
  }
];

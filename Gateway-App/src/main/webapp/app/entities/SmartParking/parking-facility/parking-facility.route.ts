import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IParkingFacility, ParkingFacility } from 'app/shared/model/SmartParking/parking-facility.model';
import { ParkingFacilityService } from './parking-facility.service';
import { ParkingFacilityComponent } from './parking-facility.component';
import { ParkingFacilityDetailComponent } from './parking-facility-detail.component';
import { ParkingFacilityUpdateComponent } from './parking-facility-update.component';

@Injectable({ providedIn: 'root' })
export class ParkingFacilityResolve implements Resolve<IParkingFacility> {
  constructor(private service: ParkingFacilityService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IParkingFacility> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((parkingFacility: HttpResponse<ParkingFacility>) => {
          if (parkingFacility.body) {
            return of(parkingFacility.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ParkingFacility());
  }
}

export const parkingFacilityRoute: Routes = [
  {
    path: '',
    component: ParkingFacilityComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ParkingFacilities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ParkingFacilityDetailComponent,
    resolve: {
      parkingFacility: ParkingFacilityResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ParkingFacilities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ParkingFacilityUpdateComponent,
    resolve: {
      parkingFacility: ParkingFacilityResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ParkingFacilities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ParkingFacilityUpdateComponent,
    resolve: {
      parkingFacility: ParkingFacilityResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ParkingFacilities'
    },
    canActivate: [UserRouteAccessService]
  }
];

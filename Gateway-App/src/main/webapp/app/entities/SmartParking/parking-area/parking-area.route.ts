import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IParkingArea, ParkingArea } from 'app/shared/model/SmartParking/parking-area.model';
import { ParkingAreaService } from './parking-area.service';
import { ParkingAreaComponent } from './parking-area.component';
import { ParkingAreaDetailComponent } from './parking-area-detail.component';
import { ParkingAreaUpdateComponent } from './parking-area-update.component';
import {ParkingAreaAllOfFacilityComponent} from "app/entities/SmartParking/parking-area/parking-area-allOfFacility.component";

@Injectable({ providedIn: 'root' })
export class ParkingAreaResolve implements Resolve<IParkingArea> {
  constructor(private service: ParkingAreaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IParkingArea> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((parkingArea: HttpResponse<ParkingArea>) => {
          if (parkingArea.body) {
            return of(parkingArea.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ParkingArea());
  }
}

export const parkingAreaRoute: Routes = [
  {
    path: '',
    component: ParkingAreaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ParkingAreas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ParkingAreaDetailComponent,
    resolve: {
      parkingArea: ParkingAreaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ParkingAreas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ParkingAreaUpdateComponent,
    resolve: {
      parkingArea: ParkingAreaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ParkingAreas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ParkingAreaUpdateComponent,
    resolve: {
      parkingArea: ParkingAreaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ParkingAreas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'ofAllFacility',
    component: ParkingAreaAllOfFacilityComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ParkingAreas'
    },
    canActivate: [UserRouteAccessService]
  }
];

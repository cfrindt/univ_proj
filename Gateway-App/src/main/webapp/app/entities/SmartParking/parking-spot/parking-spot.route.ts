import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IParkingSpot, ParkingSpot } from 'app/shared/model/SmartParking/parking-spot.model';
import { ParkingSpotService } from './parking-spot.service';
import { ParkingSpotComponent } from './parking-spot.component';
import { ParkingSpotDetailComponent } from './parking-spot-detail.component';
import { ParkingSpotUpdateComponent } from './parking-spot-update.component';

@Injectable({ providedIn: 'root' })
export class ParkingSpotResolve implements Resolve<IParkingSpot> {
  constructor(private service: ParkingSpotService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IParkingSpot> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((parkingSpot: HttpResponse<ParkingSpot>) => {
          if (parkingSpot.body) {
            return of(parkingSpot.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ParkingSpot());
  }
}

export const parkingSpotRoute: Routes = [
  {
    path: '',
    component: ParkingSpotComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ParkingSpots'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ParkingSpotDetailComponent,
    resolve: {
      parkingSpot: ParkingSpotResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ParkingSpots'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ParkingSpotUpdateComponent,
    resolve: {
      parkingSpot: ParkingSpotResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ParkingSpots'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ParkingSpotUpdateComponent,
    resolve: {
      parkingSpot: ParkingSpotResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ParkingSpots'
    },
    canActivate: [UserRouteAccessService]
  }
];

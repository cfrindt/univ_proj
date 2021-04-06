import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { Authority } from 'app/shared/constants/authority.constants';

//import components for creating paths
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { HomeComponent } from 'app/home/home.component';

//Localhost URLs in gruen
const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  {
    path: 'admin',
    data: {
      authorities: [Authority.ADMIN]
    },
    canActivate: [UserRouteAccessService],
    loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'parking-management',
    loadChildren: () => import('./parking-management/parking-management.module').then(m => m.ParkingManagementModule)
  },
  {
    path: 'smart-lernplatz',
    loadChildren: () => import('./smart-lernplatz/smart-lernplatz.module').then(m => m.SmartLernplatzModule)
  },
  ...LAYOUT_ROUTES
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: DEBUG_INFO_ENABLED })],
  exports: [RouterModule]
})
export class GatewayAppAppRoutingModule {}

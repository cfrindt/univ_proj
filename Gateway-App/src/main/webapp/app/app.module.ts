import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import './vendor';
import { GatewayAppSharedModule } from 'app/shared/shared.module';
import { GatewayAppCoreModule } from 'app/core/core.module';
import { GatewayAppAppRoutingModule } from './app-routing.module';
import { GatewayAppHomeModule } from './home/home.module';
import { GatewayAppEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';
import { ParkingManagementModule } from 'app/parking-management/parking-management.module';

@NgModule({
  imports: [
    BrowserModule,
    GatewayAppSharedModule,
    GatewayAppCoreModule,
    GatewayAppHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    GatewayAppEntityModule,
    GatewayAppAppRoutingModule,
    ParkingManagementModule,
    FontAwesomeModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class GatewayAppAppModule {}

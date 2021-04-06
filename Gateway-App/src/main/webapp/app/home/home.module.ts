import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import {GatewayAppSharedModule} from 'app/shared/shared.module';
import {HOME_ROUTE} from './home.route';
import {HomeComponent} from './home.component';

@NgModule({
  imports: [GatewayAppSharedModule, FontAwesomeModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent]
})
export class GatewayAppHomeModule {
}

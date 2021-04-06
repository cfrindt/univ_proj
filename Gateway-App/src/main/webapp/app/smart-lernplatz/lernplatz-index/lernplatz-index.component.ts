import { Component, OnInit } from '@angular/core';
import { ILearningSpot } from 'app/shared/model/SmartLernplatz/learning-spot.model';
import { HttpResponse } from '@angular/common/http';
import { SmartLernplatzService } from 'app/smart-lernplatz/smart-lernplatz.service';
import { faBookmark, faCar, faLock, faParking, faChartBar, faBookOpen, faListAlt } from '@fortawesome/free-solid-svg-icons';
import { IBookingExtended } from 'app/shared/model/SmartLernplatz/booking-extended.model';
import { IUser } from '../../../../../../../jhipster-registry/src/main/webapp/app/core/user/user.model';

@Component({
  selector: 'jhi-lernplatz-index',
  templateUrl: './lernplatz-index.component.html',
  styleUrls: ['./lernplatz-index.component.scss']
})
export class LernplatzIndexComponent implements OnInit {
  activeBooking: boolean | undefined;
  currentBooking?: IBookingExtended;
  currentUser?: IUser;
  admin = false;

  faParking = faParking;
  faLock = faLock;
  faCar = faCar;
  faBookmark = faBookmark;
  faChartBar = faChartBar;
  faBookOpen = faBookOpen;
  faListAlt = faListAlt;

  constructor(protected smartLernplatzService: SmartLernplatzService) {}

  async ngOnInit(): Promise<void> {
    await this.getAccessRights();

    await this.getCurrentBooking();

    if (this.currentBooking === undefined) {
      this.activeBooking = false;
    } else {
      this.activeBooking = true;
    }
  }

  async getCurrentBooking(): Promise<void> {
    await this.smartLernplatzService
      .getCurrentBooking()
      .then((res: HttpResponse<IBookingExtended>) => (this.currentBooking = res.body || undefined));
  }

  async getAccessRights(): Promise<void> {
    await this.smartLernplatzService
      .getCurrentUserInformation()
      .then((res: HttpResponse<IUser>) => (this.currentUser = res.body || undefined));

    if (this.currentUser?.authorities?.includes('ROLE_ADMIN')) {
      this.admin = true;
    }
  }
}

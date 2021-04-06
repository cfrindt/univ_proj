import { Component, OnInit } from '@angular/core';
import { faBookmark, faCar, faLock, faParking, faEuroSign, faTools } from '@fortawesome/free-solid-svg-icons';
import { HttpResponse } from '@angular/common/http';
import { IUser } from '../../../../../../../jhipster-registry/src/main/webapp/app/core/user/user.model';
import { SmartLernplatzService } from 'app/smart-lernplatz/smart-lernplatz.service';

@Component({
  selector: 'jhi-parking-index',
  templateUrl: './parking-index.component.html',
  styleUrls: ['./parking-index.component.scss']
})
export class ParkingIndexComponent implements OnInit {
  faParking = faParking;
  faLock = faLock;
  faCar = faCar;
  faBookmark = faBookmark;
  faEuroSign = faEuroSign;
  faTools = faTools;

  currentUser?: IUser;
  admin = false;

  constructor(protected smartLernplatzService: SmartLernplatzService) {}

  async ngOnInit(): Promise<void> {
    await this.getAccessRights();
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

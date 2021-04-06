import { Component, Input, OnInit } from '@angular/core';
import { IParkingArea } from 'app/shared/model/SmartParking/parking-area.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faLock, faTimes, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { IParkingSpot } from 'app/shared/model/SmartParking/parking-spot.model';
import { ParkingManagementService } from 'app/parking-management/parking-management.service';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ICar } from 'app/shared/model/SmartParking/car.model';
import moment from 'moment';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'jhi-overview-reservation',
  templateUrl: './overview-reservation.component.html',
  styleUrls: ['./overview-reservation.component.scss']
})
export class OverviewReservationComponent implements OnInit {
  // @ts-ignore
  @Input() currentParkingArea: IParkingArea;
  parkingSpotsInCurrentArea?: IParkingSpot[];
  cars?: ICar[];
  spotReserved: boolean;
  reservationExpireTime: any;

  // @ts-ignore
  reservedSpot: IParkingSpot;

  faLock = faLock;
  faTimes = faTimes;
  faWindowClose = faWindowClose;

  licenseForm = this.fb.group({
    carId: [null, Validators.required]
  });

  constructor(public activeModal: NgbActiveModal, protected parkingManagementService: ParkingManagementService, private fb: FormBuilder) {
    this.spotReserved = false;
  }

  ngOnInit(): void {
    this.getParkingSpotsOfArea();
    this.loadCarsOfCurrentUser();
  }

  getParkingSpotsOfArea(): void {
    this.parkingManagementService
      .getAllFreeParkingSpotsInParkingArea(this.currentParkingArea?.id)
      .subscribe((res: HttpResponse<IParkingSpot[]>) => {
        this.parkingSpotsInCurrentArea = res.body || [];
      });
  }

  loadCarsOfCurrentUser(): void {
    this.parkingManagementService.getAllCarsOfUser().subscribe((res: HttpResponse<ICar[]>) => (this.cars = res.body || []));
  }

  reserveParkingSpot(parkingArea: IParkingArea): void {
    if (this.parkingSpotsInCurrentArea) {
      // @ts-ignore
      this.parkingManagementService
        .createNewReservation(this.parkingSpotsInCurrentArea[0].id, this.licenseForm.getRawValue().carId)
        .subscribe(() => {
          // @ts-ignore
          this.reservedSpot = this.parkingSpotsInCurrentArea[0];
          this.spotReserved = true;
          this.reservationExpireTime = moment(new Date())
            .add(30, 'm')
            .toDate();
        });
    }
  }
}

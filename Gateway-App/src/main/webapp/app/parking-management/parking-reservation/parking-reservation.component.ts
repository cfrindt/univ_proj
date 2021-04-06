import { Component, OnInit } from '@angular/core';
import { ParkingManagementService } from 'app/parking-management/parking-management.service';
import { HttpResponse } from '@angular/common/http';
import { IParkingArea } from 'app/shared/model/SmartParking/parking-area.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IParkingSpot, ParkingSpot } from 'app/shared/model/SmartParking/parking-spot.model';
import { Observable } from 'rxjs';
import { ParkingSpotService } from 'app/entities/SmartParking/parking-spot/parking-spot.service';
import { ParkingAreaService } from 'app/entities/SmartParking/parking-area/parking-area.service';
import { ActivatedRoute } from '@angular/router';
import { ICar } from 'app/shared/model/SmartParking/car.model';
import { Booking, IBooking } from 'app/shared/model/SmartParking/booking.model';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { BookingService } from 'app/entities/SmartParking/booking/booking.service';
import { faFemale, faStopwatch, faWheelchair } from '@fortawesome/free-solid-svg-icons';
import { IUser } from '../../../../../../../jhipster-registry/src/main/webapp/app/core/user/user.model';

@Component({
  selector: 'jhi-parking-reservation',
  templateUrl: './parking-reservation.component.html',
  styleUrls: ['./parking-reservation.component.scss']
})
export class ParkingReservationComponent implements OnInit {
  parkingSpots: IParkingSpot[] = [];
  parkingSpotsIntermediary?: IParkingSpot[] | undefined;
  editProfileForm: FormGroup;
  parkingAreas: IParkingArea[] = [];
  isSaving = false;
  selectedParkingSpotId: number;
  cars?: ICar[];
  allParkingAreas: IParkingArea[] = [];
  allBookings: IBooking[] = [];
  currentUser?: IUser;
  reservedBookings: IBooking[] = [];

  faWheelchair = faWheelchair;
  faFemale = faFemale;
  faStopwatch = faStopwatch;

  editForm = this.fb.group({
    carId: [null, Validators.required]
  });

  constructor(
    protected parkingManagementService: ParkingManagementService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    protected parkingSpotService: ParkingSpotService,
    protected parkingAreaService: ParkingAreaService,
    protected bookingService: BookingService,
    protected activatedRoute: ActivatedRoute
  ) {
    this.editProfileForm = this.fb.group({
      parkingSpotId: ['']
    });

    this.selectedParkingSpotId = 0;
  }

  ngOnInit(): void {
    this.loadParkingSpots();
    this.loadCarsOfCurrentUser();
    this.getAllBookings();

    this.activatedRoute.data.subscribe(({ parkingSpot }) => {
      this.parkingAreaService.query().subscribe((res: HttpResponse<IParkingArea[]>) => (this.parkingAreas = res.body || []));
    });
  }

  openNewCarModal(content: any, parkplatz: number): void {
    const modal: NgbModalRef = this.modalService.open(content, { centered: true });

    this.selectedParkingSpotId = parkplatz;
  }

  save(): void {
    this.subscribeToSaveResponse(
      this.parkingManagementService.createNewReservation(this.selectedParkingSpotId, this.editForm.getRawValue().carId)
    );

    this.ngOnInit();
  }

  loadCarsOfCurrentUser(): void {
    this.parkingManagementService.getAllCarsOfUser().subscribe((res: HttpResponse<ICar[]>) => (this.cars = res.body || []));
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParkingSpot>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.modalService.dismissAll();
    this.loadParkingSpots();
    this.getAllBookings();

    //this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
    alert('ERROR');
  }

  async loadParkingSpots(): Promise<void> {
    await this.parkingManagementService
      .getAllParkingAreasOfFacility(1)
      .then((res: HttpResponse<IParkingArea[]>) => (this.allParkingAreas = res.body || []));

    this.parkingManagementService
      .getAllParkingSpotsInParkingFacility(1)
      .then((res: HttpResponse<IParkingSpot[]>) => (this.parkingSpots = res.body || []));
  }

  trackId(index: number, item: IParkingArea): number {
    return item.id!;
  }

  trackId2(index: number, item: ICar): number {
    return item.id!;
  }

  trackId3(index: number, item: IBooking): number {
    return item.id!;
  }

  close(): void {
    this.modalService.dismissAll();
  }

  async getAllBookings(): Promise<void> {
    await this.parkingManagementService.getAllBookings().then((res: HttpResponse<IBooking[]>) => (this.allBookings = res.body || []));

    await this.parkingManagementService
      .getCurrentUserInformation()
      .then((res: HttpResponse<IUser>) => (this.currentUser = res.body || undefined));

    for (const booking of this.allBookings) {
      if (booking.userId === this.currentUser?.id && !booking.bookingActive && booking.reserved) {
        this.reservedBookings.push(booking);
      }
    }
  }
}

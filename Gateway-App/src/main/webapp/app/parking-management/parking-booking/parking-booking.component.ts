import { Component, OnInit } from '@angular/core';
import { ParkingManagementService } from 'app/parking-management/parking-management.service';
import { Booking, IBooking } from 'app/shared/model/SmartParking/booking.model';
import { HttpResponse } from '@angular/common/http';
import { Car, ICar } from 'app/shared/model/SmartParking/car.model';
import { faParking, faPlus, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { IParkingArea } from 'app/shared/model/SmartParking/parking-area.model';
import { IParkingSpot } from 'app/shared/model/SmartParking/parking-spot.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'jhi-parking-booking',
  templateUrl: './parking-booking.component.html',
  styleUrls: ['./parking-booking.component.scss']
})
export class ParkingBookingComponent implements OnInit {
  faWindowClose = faWindowClose;
  faPlus = faPlus;
  faParking = faParking;

  carsOfUser?: ICar[];
  activeBookings?: IBooking[];
  parkingAreas?: IParkingArea[];
  parkingSpotsOfArea?: IParkingSpot[];

  time = new Date();
  timer: NodeJS.Timeout | undefined;

  bookingForm = this.fb.group({
    parkingArea: [],
    parkingSpot: [],
    car: []
  });

  constructor(protected parkingManagementService: ParkingManagementService, protected modalService: NgbModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getAllActiveBookingsOfUser();

    this.timer = setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  getAllActiveBookingsOfUser(): void {
    this.parkingManagementService
      .getAllActiveBookingsOfCurrentUser()
      .subscribe((res: HttpResponse<ICar[]>) => (this.activeBookings = res.body || []));
  }

  async getAllParkingAreasOfFacility(i: number): Promise<void> {
    await this.parkingManagementService
      .getAllParkingAreasOfFacility(i)
      .then((res: HttpResponse<IParkingArea[]>) => (this.parkingAreas = res.body || []));
  }

  getAllCarsOfCurrentUser(): void {
    this.parkingManagementService.getAllCarsOfUser().subscribe((res: HttpResponse<ICar[]>) => (this.carsOfUser = res.body || []));
  }

  async openBookingModal(content: any): Promise<void> {
    this.getAllCarsOfCurrentUser();
    await this.getAllParkingAreasOfFacility(1);
    this.modalService.open(content, { centered: true });
  }

  getParkingSpotsOfCurrentArea(areaId: number): void {
    this.parkingManagementService
      .getAllFreeParkingSpotsInParkingArea(areaId)
      .subscribe((res: HttpResponse<IParkingSpot[]>) => (this.parkingSpotsOfArea = res.body || []));
  }

  createBooking(): void {
    const booking = this.createFromForm();
    this.subscribeToSaveResponse(this.parkingManagementService.createNewBooking(booking));
    this.modalService.dismissAll();
    this.bookingForm.reset();
  }

  private createFromForm(): IBooking {
    return {
      ...new Booking(),
      id: undefined,
      parkingSpotId: this.bookingForm.get(['parkingSpot'])!.value,
      carLicensePlate: this.bookingForm.get(['car'])!.value,
      bookingActive: true
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBooking>>): void {
    result.subscribe(() => this.onSaveSuccess());
  }

  protected onSaveSuccess(): void {
    this.getAllActiveBookingsOfUser();
  }

  saveBooking(): void {
    this.createBooking();
  }

  async endBooking(id: number): Promise<void> {
    await this.parkingManagementService.endBooking(id);
    this.ngOnInit();
  }
}

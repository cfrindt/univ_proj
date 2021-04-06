import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IBooking, Booking } from 'app/shared/model/SmartParking/booking.model';
import { BookingService } from './booking.service';
import { IParkingSpot } from 'app/shared/model/SmartParking/parking-spot.model';
import { ParkingSpotService } from 'app/entities/SmartParking/parking-spot/parking-spot.service';
import { ICar } from 'app/shared/model/SmartParking/car.model';
import { CarService } from 'app/entities/SmartParking/car/car.service';

type SelectableEntity = IParkingSpot | ICar;

@Component({
  selector: 'jhi-booking-update',
  templateUrl: './booking-update.component.html'
})
export class BookingUpdateComponent implements OnInit {
  isSaving = false;
  parkingspots: IParkingSpot[] = [];
  cars: ICar[] = [];

  editForm = this.fb.group({
    id: [],
    startTime: [],
    endTime: [],
    parkingTime: [],
    reserved: [],
    reservationTime: [],
    cost: [null, [Validators.min(0)]],
    bookingActive: [],
    userId: [null, [Validators.required]],
    parkingSpotId: [null, Validators.required],
    carId: [null, Validators.required]
  });

  constructor(
    protected bookingService: BookingService,
    protected parkingSpotService: ParkingSpotService,
    protected carService: CarService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ booking }) => {
      if (!booking.id) {
        const today = moment().startOf('day');
        booking.startTime = today;
        booking.endTime = today;
        booking.reservationTime = today;
      }

      this.updateForm(booking);

      this.parkingSpotService.query().subscribe((res: HttpResponse<IParkingSpot[]>) => (this.parkingspots = res.body || []));

      this.carService.query().subscribe((res: HttpResponse<ICar[]>) => (this.cars = res.body || []));
    });
  }

  updateForm(booking: IBooking): void {
    this.editForm.patchValue({
      id: booking.id,
      startTime: booking.startTime ? booking.startTime.format(DATE_TIME_FORMAT) : null,
      endTime: booking.endTime ? booking.endTime.format(DATE_TIME_FORMAT) : null,
      parkingTime: booking.parkingTime,
      reserved: booking.reserved,
      reservationTime: booking.reservationTime ? booking.reservationTime.format(DATE_TIME_FORMAT) : null,
      cost: booking.cost,
      bookingActive: booking.bookingActive,
      userId: booking.userId,
      parkingSpotId: booking.parkingSpotId,
      carId: booking.carId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const booking = this.createFromForm();
    if (booking.id !== undefined) {
      this.subscribeToSaveResponse(this.bookingService.update(booking));
    } else {
      this.subscribeToSaveResponse(this.bookingService.create(booking));
    }
  }

  private createFromForm(): IBooking {
    return {
      ...new Booking(),
      id: this.editForm.get(['id'])!.value,
      startTime: this.editForm.get(['startTime'])!.value ? moment(this.editForm.get(['startTime'])!.value, DATE_TIME_FORMAT) : undefined,
      endTime: this.editForm.get(['endTime'])!.value ? moment(this.editForm.get(['endTime'])!.value, DATE_TIME_FORMAT) : undefined,
      parkingTime: this.editForm.get(['parkingTime'])!.value,
      reserved: this.editForm.get(['reserved'])!.value,
      reservationTime: this.editForm.get(['reservationTime'])!.value
        ? moment(this.editForm.get(['reservationTime'])!.value, DATE_TIME_FORMAT)
        : undefined,
      cost: this.editForm.get(['cost'])!.value,
      bookingActive: this.editForm.get(['bookingActive'])!.value,
      userId: this.editForm.get(['userId'])!.value,
      parkingSpotId: this.editForm.get(['parkingSpotId'])!.value,
      carId: this.editForm.get(['carId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBooking>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}

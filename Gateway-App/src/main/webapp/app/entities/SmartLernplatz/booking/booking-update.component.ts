import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IBooking, Booking } from 'app/shared/model/SmartLernplatz/booking.model';
import { BookingService } from './booking.service';
import { ILearningSpot } from 'app/shared/model/SmartLernplatz/learning-spot.model';
import { LearningSpotService } from 'app/entities/SmartLernplatz/learning-spot/learning-spot.service';

@Component({
  selector: 'jhi-booking-update',
  templateUrl: './booking-update.component.html'
})
export class BookingUpdateComponent implements OnInit {
  isSaving = false;
  learningspots: ILearningSpot[] = [];

  editForm = this.fb.group({
    id: [],
    userId: [null, [Validators.required]],
    bookingStartStamp: [],
    bookingEndStamp: [],
    isPaused: [null, [Validators.required]],
    pauseStartStamp: [],
    pauseEndStamp: [],
    learningSpotId: [null, Validators.required]
  });

  constructor(
    protected bookingService: BookingService,
    protected learningSpotService: LearningSpotService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ booking }) => {
      if (!booking.id) {
        const today = moment().startOf('day');
        booking.bookingStartStamp = today;
        booking.bookingEndStamp = today;
        booking.pauseStartStamp = today;
        booking.pauseEndStamp = today;
      }

      this.updateForm(booking);

      this.learningSpotService.query().subscribe((res: HttpResponse<ILearningSpot[]>) => (this.learningspots = res.body || []));
    });
  }

  updateForm(booking: IBooking): void {
    this.editForm.patchValue({
      id: booking.id,
      userId: booking.userId,
      bookingStartStamp: booking.bookingStartStamp ? booking.bookingStartStamp.format(DATE_TIME_FORMAT) : null,
      bookingEndStamp: booking.bookingEndStamp ? booking.bookingEndStamp.format(DATE_TIME_FORMAT) : null,
      isPaused: booking.isPaused,
      pauseStartStamp: booking.pauseStartStamp ? booking.pauseStartStamp.format(DATE_TIME_FORMAT) : null,
      pauseEndStamp: booking.pauseEndStamp ? booking.pauseEndStamp.format(DATE_TIME_FORMAT) : null,
      learningSpotId: booking.learningSpotId
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
      userId: this.editForm.get(['userId'])!.value,
      bookingStartStamp: this.editForm.get(['bookingStartStamp'])!.value
        ? moment(this.editForm.get(['bookingStartStamp'])!.value, DATE_TIME_FORMAT)
        : undefined,
      bookingEndStamp: this.editForm.get(['bookingEndStamp'])!.value
        ? moment(this.editForm.get(['bookingEndStamp'])!.value, DATE_TIME_FORMAT)
        : undefined,
      isPaused: this.editForm.get(['isPaused'])!.value,
      pauseStartStamp: this.editForm.get(['pauseStartStamp'])!.value
        ? moment(this.editForm.get(['pauseStartStamp'])!.value, DATE_TIME_FORMAT)
        : undefined,
      pauseEndStamp: this.editForm.get(['pauseEndStamp'])!.value
        ? moment(this.editForm.get(['pauseEndStamp'])!.value, DATE_TIME_FORMAT)
        : undefined,
      learningSpotId: this.editForm.get(['learningSpotId'])!.value
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

  trackById(index: number, item: ILearningSpot): any {
    return item.id;
  }
}

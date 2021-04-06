import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ISpotHistory, SpotHistory } from 'app/shared/model/SmartLernplatz/spot-history.model';
import { SpotHistoryService } from './spot-history.service';

@Component({
  selector: 'jhi-spot-history-update',
  templateUrl: './spot-history-update.component.html'
})
export class SpotHistoryUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    learningSpotId: [null, [Validators.required]],
    bookingStartStamp: [],
    bookingEndStamp: [],
    pauseStartStamp: [],
    pauseEndStamp: []
  });

  constructor(protected spotHistoryService: SpotHistoryService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ spotHistory }) => {
      if (!spotHistory.id) {
        const today = moment().startOf('day');
        spotHistory.bookingStartStamp = today;
        spotHistory.bookingEndStamp = today;
        spotHistory.pauseStartStamp = today;
        spotHistory.pauseEndStamp = today;
      }

      this.updateForm(spotHistory);
    });
  }

  updateForm(spotHistory: ISpotHistory): void {
    this.editForm.patchValue({
      id: spotHistory.id,
      learningSpotId: spotHistory.learningSpotId,
      bookingStartStamp: spotHistory.bookingStartStamp ? spotHistory.bookingStartStamp.format(DATE_TIME_FORMAT) : null,
      bookingEndStamp: spotHistory.bookingEndStamp ? spotHistory.bookingEndStamp.format(DATE_TIME_FORMAT) : null,
      pauseStartStamp: spotHistory.pauseStartStamp ? spotHistory.pauseStartStamp.format(DATE_TIME_FORMAT) : null,
      pauseEndStamp: spotHistory.pauseEndStamp ? spotHistory.pauseEndStamp.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const spotHistory = this.createFromForm();
    if (spotHistory.id !== undefined) {
      this.subscribeToSaveResponse(this.spotHistoryService.update(spotHistory));
    } else {
      this.subscribeToSaveResponse(this.spotHistoryService.create(spotHistory));
    }
  }

  private createFromForm(): ISpotHistory {
    return {
      ...new SpotHistory(),
      id: this.editForm.get(['id'])!.value,
      learningSpotId: this.editForm.get(['learningSpotId'])!.value,
      bookingStartStamp: this.editForm.get(['bookingStartStamp'])!.value
        ? moment(this.editForm.get(['bookingStartStamp'])!.value, DATE_TIME_FORMAT)
        : undefined,
      bookingEndStamp: this.editForm.get(['bookingEndStamp'])!.value
        ? moment(this.editForm.get(['bookingEndStamp'])!.value, DATE_TIME_FORMAT)
        : undefined,
      pauseStartStamp: this.editForm.get(['pauseStartStamp'])!.value
        ? moment(this.editForm.get(['pauseStartStamp'])!.value, DATE_TIME_FORMAT)
        : undefined,
      pauseEndStamp: this.editForm.get(['pauseEndStamp'])!.value
        ? moment(this.editForm.get(['pauseEndStamp'])!.value, DATE_TIME_FORMAT)
        : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISpotHistory>>): void {
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
}

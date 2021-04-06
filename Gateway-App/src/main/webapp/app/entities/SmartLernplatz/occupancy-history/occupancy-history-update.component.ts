import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IOccupancyHistory, OccupancyHistory } from 'app/shared/model/SmartLernplatz/occupancy-history.model';
import { OccupancyHistoryService } from './occupancy-history.service';

@Component({
  selector: 'jhi-occupancy-history-update',
  templateUrl: './occupancy-history-update.component.html'
})
export class OccupancyHistoryUpdateComponent implements OnInit {
  isSaving = false;
  localDateStampDp: any;

  editForm = this.fb.group({
    id: [],
    timeStamp: [],
    occCounter: [],
    leanringSpotId: [],
    localDateStamp: []
  });

  constructor(
    protected occupancyHistoryService: OccupancyHistoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ occupancyHistory }) => {
      if (!occupancyHistory.id) {
        const today = moment().startOf('day');
        occupancyHistory.timeStamp = today;
      }

      this.updateForm(occupancyHistory);
    });
  }

  updateForm(occupancyHistory: IOccupancyHistory): void {
    this.editForm.patchValue({
      id: occupancyHistory.id,
      timeStamp: occupancyHistory.timeStamp ? occupancyHistory.timeStamp.format(DATE_TIME_FORMAT) : null,
      occCounter: occupancyHistory.occCounter,
      leanringSpotId: occupancyHistory.leanringSpotId,
      localDateStamp: occupancyHistory.localDateStamp
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const occupancyHistory = this.createFromForm();
    if (occupancyHistory.id !== undefined) {
      this.subscribeToSaveResponse(this.occupancyHistoryService.update(occupancyHistory));
    } else {
      this.subscribeToSaveResponse(this.occupancyHistoryService.create(occupancyHistory));
    }
  }

  private createFromForm(): IOccupancyHistory {
    return {
      ...new OccupancyHistory(),
      id: this.editForm.get(['id'])!.value,
      timeStamp: this.editForm.get(['timeStamp'])!.value ? moment(this.editForm.get(['timeStamp'])!.value, DATE_TIME_FORMAT) : undefined,
      occCounter: this.editForm.get(['occCounter'])!.value,
      leanringSpotId: this.editForm.get(['leanringSpotId'])!.value,
      localDateStamp: this.editForm.get(['localDateStamp'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOccupancyHistory>>): void {
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

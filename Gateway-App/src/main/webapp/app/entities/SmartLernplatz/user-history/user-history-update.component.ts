import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IUserHistory, UserHistory } from 'app/shared/model/SmartLernplatz/user-history.model';
import { UserHistoryService } from './user-history.service';

@Component({
  selector: 'jhi-user-history-update',
  templateUrl: './user-history-update.component.html'
})
export class UserHistoryUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    userId: [null, [Validators.required]],
    pauseStartStamp: [],
    pauseEndStamp: [],
    bookingStartStamp: [],
    bookingEndStamp: []
  });

  constructor(protected userHistoryService: UserHistoryService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userHistory }) => {
      if (!userHistory.id) {
        const today = moment().startOf('day');
        userHistory.pauseStartStamp = today;
        userHistory.pauseEndStamp = today;
        userHistory.bookingStartStamp = today;
        userHistory.bookingEndStamp = today;
      }

      this.updateForm(userHistory);
    });
  }

  updateForm(userHistory: IUserHistory): void {
    this.editForm.patchValue({
      id: userHistory.id,
      userId: userHistory.userId,
      pauseStartStamp: userHistory.pauseStartStamp ? userHistory.pauseStartStamp.format(DATE_TIME_FORMAT) : null,
      pauseEndStamp: userHistory.pauseEndStamp ? userHistory.pauseEndStamp.format(DATE_TIME_FORMAT) : null,
      bookingStartStamp: userHistory.bookingStartStamp ? userHistory.bookingStartStamp.format(DATE_TIME_FORMAT) : null,
      bookingEndStamp: userHistory.bookingEndStamp ? userHistory.bookingEndStamp.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userHistory = this.createFromForm();
    if (userHistory.id !== undefined) {
      this.subscribeToSaveResponse(this.userHistoryService.update(userHistory));
    } else {
      this.subscribeToSaveResponse(this.userHistoryService.create(userHistory));
    }
  }

  private createFromForm(): IUserHistory {
    return {
      ...new UserHistory(),
      id: this.editForm.get(['id'])!.value,
      userId: this.editForm.get(['userId'])!.value,
      pauseStartStamp: this.editForm.get(['pauseStartStamp'])!.value
        ? moment(this.editForm.get(['pauseStartStamp'])!.value, DATE_TIME_FORMAT)
        : undefined,
      pauseEndStamp: this.editForm.get(['pauseEndStamp'])!.value
        ? moment(this.editForm.get(['pauseEndStamp'])!.value, DATE_TIME_FORMAT)
        : undefined,
      bookingStartStamp: this.editForm.get(['bookingStartStamp'])!.value
        ? moment(this.editForm.get(['bookingStartStamp'])!.value, DATE_TIME_FORMAT)
        : undefined,
      bookingEndStamp: this.editForm.get(['bookingEndStamp'])!.value
        ? moment(this.editForm.get(['bookingEndStamp'])!.value, DATE_TIME_FORMAT)
        : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserHistory>>): void {
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserHistory } from 'app/shared/model/SmartLernplatz/user-history.model';

@Component({
  selector: 'jhi-user-history-detail',
  templateUrl: './user-history-detail.component.html'
})
export class UserHistoryDetailComponent implements OnInit {
  userHistory: IUserHistory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userHistory }) => (this.userHistory = userHistory));
  }

  previousState(): void {
    window.history.back();
  }
}

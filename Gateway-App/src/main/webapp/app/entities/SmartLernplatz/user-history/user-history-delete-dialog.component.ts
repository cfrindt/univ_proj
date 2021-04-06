import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserHistory } from 'app/shared/model/SmartLernplatz/user-history.model';
import { UserHistoryService } from './user-history.service';

@Component({
  templateUrl: './user-history-delete-dialog.component.html'
})
export class UserHistoryDeleteDialogComponent {
  userHistory?: IUserHistory;

  constructor(
    protected userHistoryService: UserHistoryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.userHistoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('userHistoryListModification');
      this.activeModal.close();
    });
  }
}

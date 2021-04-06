import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISpotHistory } from 'app/shared/model/SmartLernplatz/spot-history.model';
import { SpotHistoryService } from './spot-history.service';

@Component({
  templateUrl: './spot-history-delete-dialog.component.html'
})
export class SpotHistoryDeleteDialogComponent {
  spotHistory?: ISpotHistory;

  constructor(
    protected spotHistoryService: SpotHistoryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.spotHistoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('spotHistoryListModification');
      this.activeModal.close();
    });
  }
}

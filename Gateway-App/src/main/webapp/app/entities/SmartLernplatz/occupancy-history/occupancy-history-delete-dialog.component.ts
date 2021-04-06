import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOccupancyHistory } from 'app/shared/model/SmartLernplatz/occupancy-history.model';
import { OccupancyHistoryService } from './occupancy-history.service';

@Component({
  templateUrl: './occupancy-history-delete-dialog.component.html'
})
export class OccupancyHistoryDeleteDialogComponent {
  occupancyHistory?: IOccupancyHistory;

  constructor(
    protected occupancyHistoryService: OccupancyHistoryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.occupancyHistoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('occupancyHistoryListModification');
      this.activeModal.close();
    });
  }
}

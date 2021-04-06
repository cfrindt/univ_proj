import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParkingArea } from 'app/shared/model/SmartParking/parking-area.model';
import { ParkingAreaService } from './parking-area.service';

@Component({
  templateUrl: './parking-area-delete-dialog.component.html'
})
export class ParkingAreaDeleteDialogComponent {
  parkingArea?: IParkingArea;

  constructor(
    protected parkingAreaService: ParkingAreaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.parkingAreaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('parkingAreaListModification');
      this.activeModal.close();
    });
  }
}

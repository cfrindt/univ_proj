import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParkingSpot } from 'app/shared/model/SmartParking/parking-spot.model';
import { ParkingSpotService } from './parking-spot.service';

@Component({
  templateUrl: './parking-spot-delete-dialog.component.html'
})
export class ParkingSpotDeleteDialogComponent {
  parkingSpot?: IParkingSpot;

  constructor(
    protected parkingSpotService: ParkingSpotService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.parkingSpotService.delete(id).subscribe(() => {
      this.eventManager.broadcast('parkingSpotListModification');
      this.activeModal.close();
    });
  }
}

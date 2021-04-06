import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParkingFacility } from 'app/shared/model/SmartParking/parking-facility.model';
import { ParkingFacilityService } from './parking-facility.service';

@Component({
  templateUrl: './parking-facility-delete-dialog.component.html'
})
export class ParkingFacilityDeleteDialogComponent {
  parkingFacility?: IParkingFacility;

  constructor(
    protected parkingFacilityService: ParkingFacilityService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.parkingFacilityService.delete(id).subscribe(() => {
      this.eventManager.broadcast('parkingFacilityListModification');
      this.activeModal.close();
    });
  }
}

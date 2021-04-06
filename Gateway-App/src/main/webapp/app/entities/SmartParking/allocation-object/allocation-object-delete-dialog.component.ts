import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAllocationObject } from 'app/shared/model/SmartParking/allocation-object.model';
import { AllocationObjectService } from './allocation-object.service';

@Component({
  templateUrl: './allocation-object-delete-dialog.component.html'
})
export class AllocationObjectDeleteDialogComponent {
  allocationObject?: IAllocationObject;

  constructor(
    protected allocationObjectService: AllocationObjectService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.allocationObjectService.delete(id).subscribe(() => {
      this.eventManager.broadcast('allocationObjectListModification');
      this.activeModal.close();
    });
  }
}

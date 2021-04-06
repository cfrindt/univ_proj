import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILearningFacility } from 'app/shared/model/SmartLernplatz/learning-facility.model';
import { LearningFacilityService } from './learning-facility.service';

@Component({
  templateUrl: './learning-facility-delete-dialog.component.html'
})
export class LearningFacilityDeleteDialogComponent {
  learningFacility?: ILearningFacility;

  constructor(
    protected learningFacilityService: LearningFacilityService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.learningFacilityService.delete(id).subscribe(() => {
      this.eventManager.broadcast('learningFacilityListModification');
      this.activeModal.close();
    });
  }
}

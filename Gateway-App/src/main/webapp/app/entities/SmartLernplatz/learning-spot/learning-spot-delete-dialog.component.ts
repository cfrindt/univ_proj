import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILearningSpot } from 'app/shared/model/SmartLernplatz/learning-spot.model';
import { LearningSpotService } from './learning-spot.service';

@Component({
  templateUrl: './learning-spot-delete-dialog.component.html'
})
export class LearningSpotDeleteDialogComponent {
  learningSpot?: ILearningSpot;

  constructor(
    protected learningSpotService: LearningSpotService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.learningSpotService.delete(id).subscribe(() => {
      this.eventManager.broadcast('learningSpotListModification');
      this.activeModal.close();
    });
  }
}

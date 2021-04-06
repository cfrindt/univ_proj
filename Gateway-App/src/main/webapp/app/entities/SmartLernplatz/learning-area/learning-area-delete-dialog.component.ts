import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILearningArea } from 'app/shared/model/SmartLernplatz/learning-area.model';
import { LearningAreaService } from './learning-area.service';

@Component({
  templateUrl: './learning-area-delete-dialog.component.html'
})
export class LearningAreaDeleteDialogComponent {
  learningArea?: ILearningArea;

  constructor(
    protected learningAreaService: LearningAreaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.learningAreaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('learningAreaListModification');
      this.activeModal.close();
    });
  }
}

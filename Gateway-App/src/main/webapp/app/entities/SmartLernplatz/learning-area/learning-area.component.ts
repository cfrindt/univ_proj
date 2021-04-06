import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILearningArea } from 'app/shared/model/SmartLernplatz/learning-area.model';
import { LearningAreaService } from './learning-area.service';
import { LearningAreaDeleteDialogComponent } from './learning-area-delete-dialog.component';

@Component({
  selector: 'jhi-learning-area',
  templateUrl: './learning-area.component.html'
})
export class LearningAreaComponent implements OnInit, OnDestroy {
  learningAreas?: ILearningArea[];
  eventSubscriber?: Subscription;

  constructor(
    protected learningAreaService: LearningAreaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.learningAreaService.query().subscribe((res: HttpResponse<ILearningArea[]>) => (this.learningAreas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLearningAreas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILearningArea): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLearningAreas(): void {
    this.eventSubscriber = this.eventManager.subscribe('learningAreaListModification', () => this.loadAll());
  }

  delete(learningArea: ILearningArea): void {
    const modalRef = this.modalService.open(LearningAreaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.learningArea = learningArea;
  }
}

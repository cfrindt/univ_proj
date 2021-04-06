import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILearningSpot } from 'app/shared/model/SmartLernplatz/learning-spot.model';
import { LearningSpotService } from './learning-spot.service';
import { LearningSpotDeleteDialogComponent } from './learning-spot-delete-dialog.component';

@Component({
  selector: 'jhi-learning-spot',
  templateUrl: './learning-spot.component.html'
})
export class LearningSpotComponent implements OnInit, OnDestroy {
  learningSpots?: ILearningSpot[];
  eventSubscriber?: Subscription;

  constructor(
    protected learningSpotService: LearningSpotService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.learningSpotService.query().subscribe((res: HttpResponse<ILearningSpot[]>) => (this.learningSpots = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLearningSpots();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILearningSpot): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLearningSpots(): void {
    this.eventSubscriber = this.eventManager.subscribe('learningSpotListModification', () => this.loadAll());
  }

  delete(learningSpot: ILearningSpot): void {
    const modalRef = this.modalService.open(LearningSpotDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.learningSpot = learningSpot;
  }
}

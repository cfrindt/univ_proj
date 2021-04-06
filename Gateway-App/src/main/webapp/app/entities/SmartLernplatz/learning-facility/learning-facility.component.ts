import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILearningFacility } from 'app/shared/model/SmartLernplatz/learning-facility.model';
import { LearningFacilityService } from './learning-facility.service';
import { LearningFacilityDeleteDialogComponent } from './learning-facility-delete-dialog.component';

@Component({
  selector: 'jhi-learning-facility',
  templateUrl: './learning-facility.component.html'
})
export class LearningFacilityComponent implements OnInit, OnDestroy {
  learningFacilities?: ILearningFacility[];
  eventSubscriber?: Subscription;

  constructor(
    protected learningFacilityService: LearningFacilityService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.learningFacilityService.query().subscribe((res: HttpResponse<ILearningFacility[]>) => (this.learningFacilities = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLearningFacilities();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILearningFacility): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLearningFacilities(): void {
    this.eventSubscriber = this.eventManager.subscribe('learningFacilityListModification', () => this.loadAll());
  }

  delete(learningFacility: ILearningFacility): void {
    const modalRef = this.modalService.open(LearningFacilityDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.learningFacility = learningFacility;
  }
}

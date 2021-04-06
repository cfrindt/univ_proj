import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOccupancyHistory } from 'app/shared/model/SmartLernplatz/occupancy-history.model';
import { OccupancyHistoryService } from './occupancy-history.service';
import { OccupancyHistoryDeleteDialogComponent } from './occupancy-history-delete-dialog.component';

@Component({
  selector: 'jhi-occupancy-history',
  templateUrl: './occupancy-history.component.html'
})
export class OccupancyHistoryComponent implements OnInit, OnDestroy {
  occupancyHistories?: IOccupancyHistory[];
  eventSubscriber?: Subscription;

  constructor(
    protected occupancyHistoryService: OccupancyHistoryService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.occupancyHistoryService.query().subscribe((res: HttpResponse<IOccupancyHistory[]>) => (this.occupancyHistories = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInOccupancyHistories();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IOccupancyHistory): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInOccupancyHistories(): void {
    this.eventSubscriber = this.eventManager.subscribe('occupancyHistoryListModification', () => this.loadAll());
  }

  delete(occupancyHistory: IOccupancyHistory): void {
    const modalRef = this.modalService.open(OccupancyHistoryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.occupancyHistory = occupancyHistory;
  }
}

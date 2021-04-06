import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISpotHistory } from 'app/shared/model/SmartLernplatz/spot-history.model';
import { SpotHistoryService } from './spot-history.service';
import { SpotHistoryDeleteDialogComponent } from './spot-history-delete-dialog.component';

@Component({
  selector: 'jhi-spot-history',
  templateUrl: './spot-history.component.html'
})
export class SpotHistoryComponent implements OnInit, OnDestroy {
  spotHistories?: ISpotHistory[];
  eventSubscriber?: Subscription;

  constructor(
    protected spotHistoryService: SpotHistoryService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.spotHistoryService.query().subscribe((res: HttpResponse<ISpotHistory[]>) => (this.spotHistories = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSpotHistories();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISpotHistory): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSpotHistories(): void {
    this.eventSubscriber = this.eventManager.subscribe('spotHistoryListModification', () => this.loadAll());
  }

  delete(spotHistory: ISpotHistory): void {
    const modalRef = this.modalService.open(SpotHistoryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.spotHistory = spotHistory;
  }
}

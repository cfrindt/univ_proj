import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserHistory } from 'app/shared/model/SmartLernplatz/user-history.model';
import { UserHistoryService } from './user-history.service';
import { UserHistoryDeleteDialogComponent } from './user-history-delete-dialog.component';

@Component({
  selector: 'jhi-user-history',
  templateUrl: './user-history.component.html'
})
export class UserHistoryComponent implements OnInit, OnDestroy {
  userHistories?: IUserHistory[];
  eventSubscriber?: Subscription;

  constructor(
    protected userHistoryService: UserHistoryService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.userHistoryService.query().subscribe((res: HttpResponse<IUserHistory[]>) => (this.userHistories = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUserHistories();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUserHistory): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUserHistories(): void {
    this.eventSubscriber = this.eventManager.subscribe('userHistoryListModification', () => this.loadAll());
  }

  delete(userHistory: IUserHistory): void {
    const modalRef = this.modalService.open(UserHistoryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.userHistory = userHistory;
  }
}

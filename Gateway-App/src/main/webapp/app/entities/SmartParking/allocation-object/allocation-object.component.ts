import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAllocationObject } from 'app/shared/model/SmartParking/allocation-object.model';
import { AllocationObjectService } from './allocation-object.service';
import { AllocationObjectDeleteDialogComponent } from './allocation-object-delete-dialog.component';

@Component({
  selector: 'jhi-allocation-object',
  templateUrl: './allocation-object.component.html'
})
export class AllocationObjectComponent implements OnInit, OnDestroy {
  allocationObjects?: IAllocationObject[];
  eventSubscriber?: Subscription;

  constructor(
    protected allocationObjectService: AllocationObjectService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.allocationObjectService.query().subscribe((res: HttpResponse<IAllocationObject[]>) => (this.allocationObjects = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAllocationObjects();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAllocationObject): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAllocationObjects(): void {
    this.eventSubscriber = this.eventManager.subscribe('allocationObjectListModification', () => this.loadAll());
  }

  delete(allocationObject: IAllocationObject): void {
    const modalRef = this.modalService.open(AllocationObjectDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.allocationObject = allocationObject;
  }
}

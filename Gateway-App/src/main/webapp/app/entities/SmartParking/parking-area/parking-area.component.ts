import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IParkingArea } from 'app/shared/model/SmartParking/parking-area.model';
import { ParkingAreaService } from './parking-area.service';
import { ParkingAreaDeleteDialogComponent } from './parking-area-delete-dialog.component';

@Component({
  selector: 'jhi-parking-area',
  templateUrl: './parking-area.component.html'
})
export class ParkingAreaComponent implements OnInit, OnDestroy {
  parkingAreas?: IParkingArea[];
  eventSubscriber?: Subscription;

  constructor(
    protected parkingAreaService: ParkingAreaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.parkingAreaService.query().subscribe((res: HttpResponse<IParkingArea[]>) => (this.parkingAreas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInParkingAreas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  getAllAreasOfFacility(): void {
    this.parkingAreaService.getAllParkingAreasOfFacility(4).subscribe((res: HttpResponse<IParkingArea[]>) => (this.parkingAreas = res.body || []));
  }

  trackId(index: number, item: IParkingArea): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInParkingAreas(): void {
    this.eventSubscriber = this.eventManager.subscribe('parkingAreaListModification', () => this.loadAll());
  }

  delete(parkingArea: IParkingArea): void {
    const modalRef = this.modalService.open(ParkingAreaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.parkingArea = parkingArea;
  }
}

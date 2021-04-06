import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IParkingSpot } from 'app/shared/model/SmartParking/parking-spot.model';
import { ParkingSpotService } from './parking-spot.service';
import { ParkingSpotDeleteDialogComponent } from './parking-spot-delete-dialog.component';

@Component({
  selector: 'jhi-parking-spot',
  templateUrl: './parking-spot.component.html'
})
export class ParkingSpotComponent implements OnInit, OnDestroy {
  parkingSpots?: IParkingSpot[];
  eventSubscriber?: Subscription;

  constructor(
    protected parkingSpotService: ParkingSpotService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.parkingSpotService.query().subscribe((res: HttpResponse<IParkingSpot[]>) => (this.parkingSpots = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInParkingSpots();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IParkingSpot): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInParkingSpots(): void {
    this.eventSubscriber = this.eventManager.subscribe('parkingSpotListModification', () => this.loadAll());
  }

  delete(parkingSpot: IParkingSpot): void {
    const modalRef = this.modalService.open(ParkingSpotDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.parkingSpot = parkingSpot;
  }
}

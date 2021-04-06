import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IParkingFacility } from 'app/shared/model/SmartParking/parking-facility.model';
import { ParkingFacilityService } from './parking-facility.service';
import { ParkingFacilityDeleteDialogComponent } from './parking-facility-delete-dialog.component';

@Component({
  selector: 'jhi-parking-facility',
  templateUrl: './parking-facility.component.html'
})
export class ParkingFacilityComponent implements OnInit, OnDestroy {
  parkingFacilities?: IParkingFacility[];
  eventSubscriber?: Subscription;

  constructor(
    protected parkingFacilityService: ParkingFacilityService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.parkingFacilityService.query().subscribe((res: HttpResponse<IParkingFacility[]>) => (this.parkingFacilities = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInParkingFacilities();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IParkingFacility): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInParkingFacilities(): void {
    this.eventSubscriber = this.eventManager.subscribe('parkingFacilityListModification', () => this.loadAll());
  }

  delete(parkingFacility: IParkingFacility): void {
    const modalRef = this.modalService.open(ParkingFacilityDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.parkingFacility = parkingFacility;
  }
}

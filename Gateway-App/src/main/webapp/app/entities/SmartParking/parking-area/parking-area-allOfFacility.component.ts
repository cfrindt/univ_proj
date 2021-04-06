import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParkingArea } from 'app/shared/model/SmartParking/parking-area.model';
import {HttpResponse} from "@angular/common/http";
import {ParkingAreaService} from "app/entities/SmartParking/parking-area/parking-area.service";
import {ParkingAreaDeleteDialogComponent} from "app/entities/SmartParking/parking-area/parking-area-delete-dialog.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'jhi-parking-area-detail',
  templateUrl: './parking-area-allOfFacility.component.html'
})
export class ParkingAreaAllOfFacilityComponent implements OnInit {
  parkingAreas?: IParkingArea[];

  constructor(protected activatedRoute: ActivatedRoute,
              protected parkingAreaService: ParkingAreaService,
              protected modalService: NgbModal) {}

  ngOnInit(): void {
    this.parkingAreaService.getAllParkingAreasOfFacility(4).subscribe((res: HttpResponse<IParkingArea[]>) => (this.parkingAreas = res.body || []));
  }

  trackId(index: number, item: IParkingArea): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  delete(parkingArea: IParkingArea): void {
    const modalRef = this.modalService.open(ParkingAreaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.parkingArea = parkingArea;
  }

  previousState(): void {
    window.history.back();
  }
}

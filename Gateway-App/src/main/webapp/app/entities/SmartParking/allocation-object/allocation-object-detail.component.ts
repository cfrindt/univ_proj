import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAllocationObject } from 'app/shared/model/SmartParking/allocation-object.model';

@Component({
  selector: 'jhi-allocation-object-detail',
  templateUrl: './allocation-object-detail.component.html'
})
export class AllocationObjectDetailComponent implements OnInit {
  allocationObject: IAllocationObject | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ allocationObject }) => (this.allocationObject = allocationObject));
  }

  previousState(): void {
    window.history.back();
  }
}

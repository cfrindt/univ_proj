import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayAppTestModule } from '../../../../test.module';
import { AllocationObjectDetailComponent } from 'app/entities/SmartParking/allocation-object/allocation-object-detail.component';
import { AllocationObject } from 'app/shared/model/SmartParking/allocation-object.model';

describe('Component Tests', () => {
  describe('AllocationObject Management Detail Component', () => {
    let comp: AllocationObjectDetailComponent;
    let fixture: ComponentFixture<AllocationObjectDetailComponent>;
    const route = ({ data: of({ allocationObject: new AllocationObject(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [AllocationObjectDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AllocationObjectDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AllocationObjectDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load allocationObject on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.allocationObject).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

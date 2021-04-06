import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayAppTestModule } from '../../../../test.module';
import { AllocationObjectComponent } from 'app/entities/SmartParking/allocation-object/allocation-object.component';
import { AllocationObjectService } from 'app/entities/SmartParking/allocation-object/allocation-object.service';
import { AllocationObject } from 'app/shared/model/SmartParking/allocation-object.model';

describe('Component Tests', () => {
  describe('AllocationObject Management Component', () => {
    let comp: AllocationObjectComponent;
    let fixture: ComponentFixture<AllocationObjectComponent>;
    let service: AllocationObjectService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [AllocationObjectComponent]
      })
        .overrideTemplate(AllocationObjectComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AllocationObjectComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AllocationObjectService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AllocationObject(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.allocationObjects && comp.allocationObjects[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

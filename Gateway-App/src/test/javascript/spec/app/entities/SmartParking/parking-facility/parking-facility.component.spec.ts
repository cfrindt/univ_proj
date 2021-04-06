import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayAppTestModule } from '../../../../test.module';
import { ParkingFacilityComponent } from 'app/entities/SmartParking/parking-facility/parking-facility.component';
import { ParkingFacilityService } from 'app/entities/SmartParking/parking-facility/parking-facility.service';
import { ParkingFacility } from 'app/shared/model/SmartParking/parking-facility.model';

describe('Component Tests', () => {
  describe('ParkingFacility Management Component', () => {
    let comp: ParkingFacilityComponent;
    let fixture: ComponentFixture<ParkingFacilityComponent>;
    let service: ParkingFacilityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [ParkingFacilityComponent]
      })
        .overrideTemplate(ParkingFacilityComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ParkingFacilityComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ParkingFacilityService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ParkingFacility(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.parkingFacilities && comp.parkingFacilities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

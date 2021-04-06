import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayAppTestModule } from '../../../../test.module';
import { ParkingAreaComponent } from 'app/entities/SmartParking/parking-area/parking-area.component';
import { ParkingAreaService } from 'app/entities/SmartParking/parking-area/parking-area.service';
import { ParkingArea } from 'app/shared/model/SmartParking/parking-area.model';

describe('Component Tests', () => {
  describe('ParkingArea Management Component', () => {
    let comp: ParkingAreaComponent;
    let fixture: ComponentFixture<ParkingAreaComponent>;
    let service: ParkingAreaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [ParkingAreaComponent]
      })
        .overrideTemplate(ParkingAreaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ParkingAreaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ParkingAreaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ParkingArea(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.parkingAreas && comp.parkingAreas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

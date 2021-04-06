import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayAppTestModule } from '../../../../test.module';
import { ParkingSpotComponent } from 'app/entities/SmartParking/parking-spot/parking-spot.component';
import { ParkingSpotService } from 'app/entities/SmartParking/parking-spot/parking-spot.service';
import { ParkingSpot } from 'app/shared/model/SmartParking/parking-spot.model';

describe('Component Tests', () => {
  describe('ParkingSpot Management Component', () => {
    let comp: ParkingSpotComponent;
    let fixture: ComponentFixture<ParkingSpotComponent>;
    let service: ParkingSpotService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [ParkingSpotComponent]
      })
        .overrideTemplate(ParkingSpotComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ParkingSpotComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ParkingSpotService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ParkingSpot(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.parkingSpots && comp.parkingSpots[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

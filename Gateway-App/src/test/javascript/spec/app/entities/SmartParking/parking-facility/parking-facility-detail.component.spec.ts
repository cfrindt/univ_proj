import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayAppTestModule } from '../../../../test.module';
import { ParkingFacilityDetailComponent } from 'app/entities/SmartParking/parking-facility/parking-facility-detail.component';
import { ParkingFacility } from 'app/shared/model/SmartParking/parking-facility.model';

describe('Component Tests', () => {
  describe('ParkingFacility Management Detail Component', () => {
    let comp: ParkingFacilityDetailComponent;
    let fixture: ComponentFixture<ParkingFacilityDetailComponent>;
    const route = ({ data: of({ parkingFacility: new ParkingFacility(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [ParkingFacilityDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ParkingFacilityDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ParkingFacilityDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load parkingFacility on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.parkingFacility).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

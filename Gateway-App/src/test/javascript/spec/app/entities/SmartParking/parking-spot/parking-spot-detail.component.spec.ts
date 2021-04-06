import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayAppTestModule } from '../../../../test.module';
import { ParkingSpotDetailComponent } from 'app/entities/SmartParking/parking-spot/parking-spot-detail.component';
import { ParkingSpot } from 'app/shared/model/SmartParking/parking-spot.model';

describe('Component Tests', () => {
  describe('ParkingSpot Management Detail Component', () => {
    let comp: ParkingSpotDetailComponent;
    let fixture: ComponentFixture<ParkingSpotDetailComponent>;
    const route = ({ data: of({ parkingSpot: new ParkingSpot(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [ParkingSpotDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ParkingSpotDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ParkingSpotDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load parkingSpot on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.parkingSpot).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

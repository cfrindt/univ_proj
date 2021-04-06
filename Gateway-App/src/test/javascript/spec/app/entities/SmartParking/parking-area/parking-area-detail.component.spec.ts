import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayAppTestModule } from '../../../../test.module';
import { ParkingAreaDetailComponent } from 'app/entities/SmartParking/parking-area/parking-area-detail.component';
import { ParkingArea } from 'app/shared/model/SmartParking/parking-area.model';

describe('Component Tests', () => {
  describe('ParkingArea Management Detail Component', () => {
    let comp: ParkingAreaDetailComponent;
    let fixture: ComponentFixture<ParkingAreaDetailComponent>;
    const route = ({ data: of({ parkingArea: new ParkingArea(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [ParkingAreaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ParkingAreaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ParkingAreaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load parkingArea on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.parkingArea).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

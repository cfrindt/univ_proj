import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayAppTestModule } from '../../../../test.module';
import { OccupancyHistoryDetailComponent } from 'app/entities/SmartLernplatz/occupancy-history/occupancy-history-detail.component';
import { OccupancyHistory } from 'app/shared/model/SmartLernplatz/occupancy-history.model';

describe('Component Tests', () => {
  describe('OccupancyHistory Management Detail Component', () => {
    let comp: OccupancyHistoryDetailComponent;
    let fixture: ComponentFixture<OccupancyHistoryDetailComponent>;
    const route = ({ data: of({ occupancyHistory: new OccupancyHistory(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [OccupancyHistoryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OccupancyHistoryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OccupancyHistoryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load occupancyHistory on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.occupancyHistory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayAppTestModule } from '../../../../test.module';
import { OccupancyHistoryComponent } from 'app/entities/SmartLernplatz/occupancy-history/occupancy-history.component';
import { OccupancyHistoryService } from 'app/entities/SmartLernplatz/occupancy-history/occupancy-history.service';
import { OccupancyHistory } from 'app/shared/model/SmartLernplatz/occupancy-history.model';

describe('Component Tests', () => {
  describe('OccupancyHistory Management Component', () => {
    let comp: OccupancyHistoryComponent;
    let fixture: ComponentFixture<OccupancyHistoryComponent>;
    let service: OccupancyHistoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [OccupancyHistoryComponent]
      })
        .overrideTemplate(OccupancyHistoryComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OccupancyHistoryComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OccupancyHistoryService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new OccupancyHistory(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.occupancyHistories && comp.occupancyHistories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

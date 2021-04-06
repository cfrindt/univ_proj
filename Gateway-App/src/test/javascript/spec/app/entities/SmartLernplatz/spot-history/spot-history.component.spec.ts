import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayAppTestModule } from '../../../../test.module';
import { SpotHistoryComponent } from 'app/entities/SmartLernplatz/spot-history/spot-history.component';
import { SpotHistoryService } from 'app/entities/SmartLernplatz/spot-history/spot-history.service';
import { SpotHistory } from 'app/shared/model/SmartLernplatz/spot-history.model';

describe('Component Tests', () => {
  describe('SpotHistory Management Component', () => {
    let comp: SpotHistoryComponent;
    let fixture: ComponentFixture<SpotHistoryComponent>;
    let service: SpotHistoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [SpotHistoryComponent]
      })
        .overrideTemplate(SpotHistoryComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SpotHistoryComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SpotHistoryService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SpotHistory(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.spotHistories && comp.spotHistories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

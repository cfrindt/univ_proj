import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayAppTestModule } from '../../../../test.module';
import { LearningSpotComponent } from 'app/entities/SmartLernplatz/learning-spot/learning-spot.component';
import { LearningSpotService } from 'app/entities/SmartLernplatz/learning-spot/learning-spot.service';
import { LearningSpot } from 'app/shared/model/SmartLernplatz/learning-spot.model';

describe('Component Tests', () => {
  describe('LearningSpot Management Component', () => {
    let comp: LearningSpotComponent;
    let fixture: ComponentFixture<LearningSpotComponent>;
    let service: LearningSpotService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [LearningSpotComponent]
      })
        .overrideTemplate(LearningSpotComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LearningSpotComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LearningSpotService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LearningSpot(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.learningSpots && comp.learningSpots[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayAppTestModule } from '../../../../test.module';
import { LearningFacilityComponent } from 'app/entities/SmartLernplatz/learning-facility/learning-facility.component';
import { LearningFacilityService } from 'app/entities/SmartLernplatz/learning-facility/learning-facility.service';
import { LearningFacility } from 'app/shared/model/SmartLernplatz/learning-facility.model';

describe('Component Tests', () => {
  describe('LearningFacility Management Component', () => {
    let comp: LearningFacilityComponent;
    let fixture: ComponentFixture<LearningFacilityComponent>;
    let service: LearningFacilityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [LearningFacilityComponent]
      })
        .overrideTemplate(LearningFacilityComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LearningFacilityComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LearningFacilityService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LearningFacility(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.learningFacilities && comp.learningFacilities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

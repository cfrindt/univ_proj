import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayAppTestModule } from '../../../../test.module';
import { LearningAreaComponent } from 'app/entities/SmartLernplatz/learning-area/learning-area.component';
import { LearningAreaService } from 'app/entities/SmartLernplatz/learning-area/learning-area.service';
import { LearningArea } from 'app/shared/model/SmartLernplatz/learning-area.model';

describe('Component Tests', () => {
  describe('LearningArea Management Component', () => {
    let comp: LearningAreaComponent;
    let fixture: ComponentFixture<LearningAreaComponent>;
    let service: LearningAreaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [LearningAreaComponent]
      })
        .overrideTemplate(LearningAreaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LearningAreaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LearningAreaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LearningArea(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.learningAreas && comp.learningAreas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayAppTestModule } from '../../../../test.module';
import { LearningFacilityDetailComponent } from 'app/entities/SmartLernplatz/learning-facility/learning-facility-detail.component';
import { LearningFacility } from 'app/shared/model/SmartLernplatz/learning-facility.model';

describe('Component Tests', () => {
  describe('LearningFacility Management Detail Component', () => {
    let comp: LearningFacilityDetailComponent;
    let fixture: ComponentFixture<LearningFacilityDetailComponent>;
    const route = ({ data: of({ learningFacility: new LearningFacility(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [LearningFacilityDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LearningFacilityDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LearningFacilityDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load learningFacility on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.learningFacility).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

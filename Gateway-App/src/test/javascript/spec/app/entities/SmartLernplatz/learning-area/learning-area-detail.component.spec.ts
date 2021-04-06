import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayAppTestModule } from '../../../../test.module';
import { LearningAreaDetailComponent } from 'app/entities/SmartLernplatz/learning-area/learning-area-detail.component';
import { LearningArea } from 'app/shared/model/SmartLernplatz/learning-area.model';

describe('Component Tests', () => {
  describe('LearningArea Management Detail Component', () => {
    let comp: LearningAreaDetailComponent;
    let fixture: ComponentFixture<LearningAreaDetailComponent>;
    const route = ({ data: of({ learningArea: new LearningArea(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [LearningAreaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LearningAreaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LearningAreaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load learningArea on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.learningArea).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

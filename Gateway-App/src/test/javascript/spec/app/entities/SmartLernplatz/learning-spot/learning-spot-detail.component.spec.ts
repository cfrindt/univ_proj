import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayAppTestModule } from '../../../../test.module';
import { LearningSpotDetailComponent } from 'app/entities/SmartLernplatz/learning-spot/learning-spot-detail.component';
import { LearningSpot } from 'app/shared/model/SmartLernplatz/learning-spot.model';

describe('Component Tests', () => {
  describe('LearningSpot Management Detail Component', () => {
    let comp: LearningSpotDetailComponent;
    let fixture: ComponentFixture<LearningSpotDetailComponent>;
    const route = ({ data: of({ learningSpot: new LearningSpot(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [LearningSpotDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LearningSpotDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LearningSpotDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load learningSpot on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.learningSpot).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

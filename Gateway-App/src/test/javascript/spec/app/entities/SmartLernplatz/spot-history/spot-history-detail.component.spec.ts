import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayAppTestModule } from '../../../../test.module';
import { SpotHistoryDetailComponent } from 'app/entities/SmartLernplatz/spot-history/spot-history-detail.component';
import { SpotHistory } from 'app/shared/model/SmartLernplatz/spot-history.model';

describe('Component Tests', () => {
  describe('SpotHistory Management Detail Component', () => {
    let comp: SpotHistoryDetailComponent;
    let fixture: ComponentFixture<SpotHistoryDetailComponent>;
    const route = ({ data: of({ spotHistory: new SpotHistory(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [SpotHistoryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SpotHistoryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SpotHistoryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load spotHistory on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.spotHistory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

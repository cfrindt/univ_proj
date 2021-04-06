import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayAppTestModule } from '../../../../test.module';
import { UserHistoryDetailComponent } from 'app/entities/SmartLernplatz/user-history/user-history-detail.component';
import { UserHistory } from 'app/shared/model/SmartLernplatz/user-history.model';

describe('Component Tests', () => {
  describe('UserHistory Management Detail Component', () => {
    let comp: UserHistoryDetailComponent;
    let fixture: ComponentFixture<UserHistoryDetailComponent>;
    const route = ({ data: of({ userHistory: new UserHistory(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [UserHistoryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(UserHistoryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserHistoryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load userHistory on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userHistory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

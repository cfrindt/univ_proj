import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayAppTestModule } from '../../../../test.module';
import { UserHistoryComponent } from 'app/entities/SmartLernplatz/user-history/user-history.component';
import { UserHistoryService } from 'app/entities/SmartLernplatz/user-history/user-history.service';
import { UserHistory } from 'app/shared/model/SmartLernplatz/user-history.model';

describe('Component Tests', () => {
  describe('UserHistory Management Component', () => {
    let comp: UserHistoryComponent;
    let fixture: ComponentFixture<UserHistoryComponent>;
    let service: UserHistoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [UserHistoryComponent]
      })
        .overrideTemplate(UserHistoryComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserHistoryComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserHistoryService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UserHistory(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.userHistories && comp.userHistories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

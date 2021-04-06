import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayAppTestModule } from '../../../../test.module';
import { UserHistoryUpdateComponent } from 'app/entities/SmartLernplatz/user-history/user-history-update.component';
import { UserHistoryService } from 'app/entities/SmartLernplatz/user-history/user-history.service';
import { UserHistory } from 'app/shared/model/SmartLernplatz/user-history.model';

describe('Component Tests', () => {
  describe('UserHistory Management Update Component', () => {
    let comp: UserHistoryUpdateComponent;
    let fixture: ComponentFixture<UserHistoryUpdateComponent>;
    let service: UserHistoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [UserHistoryUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(UserHistoryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserHistoryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserHistoryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserHistory(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserHistory();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});

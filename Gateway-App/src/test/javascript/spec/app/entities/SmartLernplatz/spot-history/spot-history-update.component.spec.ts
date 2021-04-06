import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayAppTestModule } from '../../../../test.module';
import { SpotHistoryUpdateComponent } from 'app/entities/SmartLernplatz/spot-history/spot-history-update.component';
import { SpotHistoryService } from 'app/entities/SmartLernplatz/spot-history/spot-history.service';
import { SpotHistory } from 'app/shared/model/SmartLernplatz/spot-history.model';

describe('Component Tests', () => {
  describe('SpotHistory Management Update Component', () => {
    let comp: SpotHistoryUpdateComponent;
    let fixture: ComponentFixture<SpotHistoryUpdateComponent>;
    let service: SpotHistoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [SpotHistoryUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SpotHistoryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SpotHistoryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SpotHistoryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SpotHistory(123);
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
        const entity = new SpotHistory();
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

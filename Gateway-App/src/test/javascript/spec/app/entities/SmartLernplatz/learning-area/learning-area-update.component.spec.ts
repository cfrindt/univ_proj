import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayAppTestModule } from '../../../../test.module';
import { LearningAreaUpdateComponent } from 'app/entities/SmartLernplatz/learning-area/learning-area-update.component';
import { LearningAreaService } from 'app/entities/SmartLernplatz/learning-area/learning-area.service';
import { LearningArea } from 'app/shared/model/SmartLernplatz/learning-area.model';

describe('Component Tests', () => {
  describe('LearningArea Management Update Component', () => {
    let comp: LearningAreaUpdateComponent;
    let fixture: ComponentFixture<LearningAreaUpdateComponent>;
    let service: LearningAreaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [LearningAreaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(LearningAreaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LearningAreaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LearningAreaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LearningArea(123);
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
        const entity = new LearningArea();
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

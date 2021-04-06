import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayAppTestModule } from '../../../../test.module';
import { LearningFacilityUpdateComponent } from 'app/entities/SmartLernplatz/learning-facility/learning-facility-update.component';
import { LearningFacilityService } from 'app/entities/SmartLernplatz/learning-facility/learning-facility.service';
import { LearningFacility } from 'app/shared/model/SmartLernplatz/learning-facility.model';

describe('Component Tests', () => {
  describe('LearningFacility Management Update Component', () => {
    let comp: LearningFacilityUpdateComponent;
    let fixture: ComponentFixture<LearningFacilityUpdateComponent>;
    let service: LearningFacilityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [LearningFacilityUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(LearningFacilityUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LearningFacilityUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LearningFacilityService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LearningFacility(123);
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
        const entity = new LearningFacility();
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

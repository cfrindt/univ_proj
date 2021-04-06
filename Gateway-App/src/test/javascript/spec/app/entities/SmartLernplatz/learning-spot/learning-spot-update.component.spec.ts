import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayAppTestModule } from '../../../../test.module';
import { LearningSpotUpdateComponent } from 'app/entities/SmartLernplatz/learning-spot/learning-spot-update.component';
import { LearningSpotService } from 'app/entities/SmartLernplatz/learning-spot/learning-spot.service';
import { LearningSpot } from 'app/shared/model/SmartLernplatz/learning-spot.model';

describe('Component Tests', () => {
  describe('LearningSpot Management Update Component', () => {
    let comp: LearningSpotUpdateComponent;
    let fixture: ComponentFixture<LearningSpotUpdateComponent>;
    let service: LearningSpotService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [LearningSpotUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(LearningSpotUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LearningSpotUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LearningSpotService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LearningSpot(123);
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
        const entity = new LearningSpot();
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

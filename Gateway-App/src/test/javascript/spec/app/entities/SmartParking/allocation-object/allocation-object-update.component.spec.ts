import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayAppTestModule } from '../../../../test.module';
import { AllocationObjectUpdateComponent } from 'app/entities/SmartParking/allocation-object/allocation-object-update.component';
import { AllocationObjectService } from 'app/entities/SmartParking/allocation-object/allocation-object.service';
import { AllocationObject } from 'app/shared/model/SmartParking/allocation-object.model';

describe('Component Tests', () => {
  describe('AllocationObject Management Update Component', () => {
    let comp: AllocationObjectUpdateComponent;
    let fixture: ComponentFixture<AllocationObjectUpdateComponent>;
    let service: AllocationObjectService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [AllocationObjectUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AllocationObjectUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AllocationObjectUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AllocationObjectService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AllocationObject(123);
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
        const entity = new AllocationObject();
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

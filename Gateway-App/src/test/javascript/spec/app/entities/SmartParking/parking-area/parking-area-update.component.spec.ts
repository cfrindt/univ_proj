import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayAppTestModule } from '../../../../test.module';
import { ParkingAreaUpdateComponent } from 'app/entities/SmartParking/parking-area/parking-area-update.component';
import { ParkingAreaService } from 'app/entities/SmartParking/parking-area/parking-area.service';
import { ParkingArea } from 'app/shared/model/SmartParking/parking-area.model';

describe('Component Tests', () => {
  describe('ParkingArea Management Update Component', () => {
    let comp: ParkingAreaUpdateComponent;
    let fixture: ComponentFixture<ParkingAreaUpdateComponent>;
    let service: ParkingAreaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [ParkingAreaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ParkingAreaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ParkingAreaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ParkingAreaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ParkingArea(123);
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
        const entity = new ParkingArea();
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

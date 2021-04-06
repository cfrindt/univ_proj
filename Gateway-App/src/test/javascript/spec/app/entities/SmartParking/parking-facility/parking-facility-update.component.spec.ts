import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayAppTestModule } from '../../../../test.module';
import { ParkingFacilityUpdateComponent } from 'app/entities/SmartParking/parking-facility/parking-facility-update.component';
import { ParkingFacilityService } from 'app/entities/SmartParking/parking-facility/parking-facility.service';
import { ParkingFacility } from 'app/shared/model/SmartParking/parking-facility.model';

describe('Component Tests', () => {
  describe('ParkingFacility Management Update Component', () => {
    let comp: ParkingFacilityUpdateComponent;
    let fixture: ComponentFixture<ParkingFacilityUpdateComponent>;
    let service: ParkingFacilityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [ParkingFacilityUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ParkingFacilityUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ParkingFacilityUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ParkingFacilityService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ParkingFacility(123);
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
        const entity = new ParkingFacility();
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

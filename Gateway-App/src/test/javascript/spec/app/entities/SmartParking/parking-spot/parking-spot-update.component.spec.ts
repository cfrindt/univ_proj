import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayAppTestModule } from '../../../../test.module';
import { ParkingSpotUpdateComponent } from 'app/entities/SmartParking/parking-spot/parking-spot-update.component';
import { ParkingSpotService } from 'app/entities/SmartParking/parking-spot/parking-spot.service';
import { ParkingSpot } from 'app/shared/model/SmartParking/parking-spot.model';

describe('Component Tests', () => {
  describe('ParkingSpot Management Update Component', () => {
    let comp: ParkingSpotUpdateComponent;
    let fixture: ComponentFixture<ParkingSpotUpdateComponent>;
    let service: ParkingSpotService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [ParkingSpotUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ParkingSpotUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ParkingSpotUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ParkingSpotService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ParkingSpot(123);
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
        const entity = new ParkingSpot();
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

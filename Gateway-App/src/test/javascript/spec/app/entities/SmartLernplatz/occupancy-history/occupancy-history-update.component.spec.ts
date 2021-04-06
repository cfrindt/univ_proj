import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayAppTestModule } from '../../../../test.module';
import { OccupancyHistoryUpdateComponent } from 'app/entities/SmartLernplatz/occupancy-history/occupancy-history-update.component';
import { OccupancyHistoryService } from 'app/entities/SmartLernplatz/occupancy-history/occupancy-history.service';
import { OccupancyHistory } from 'app/shared/model/SmartLernplatz/occupancy-history.model';

describe('Component Tests', () => {
  describe('OccupancyHistory Management Update Component', () => {
    let comp: OccupancyHistoryUpdateComponent;
    let fixture: ComponentFixture<OccupancyHistoryUpdateComponent>;
    let service: OccupancyHistoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [OccupancyHistoryUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OccupancyHistoryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OccupancyHistoryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OccupancyHistoryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OccupancyHistory(123);
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
        const entity = new OccupancyHistory();
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

import { Component, OnInit } from '@angular/core';
import { IParkingArea } from 'app/shared/model/SmartParking/parking-area.model';
import { ParkingManagementService } from 'app/parking-management/parking-management.service';
import { HttpResponse } from '@angular/common/http';
import { IParkingSpot } from 'app/shared/model/SmartParking/parking-spot.model';
import { FormBuilder, Validators } from '@angular/forms';
import * as L from 'leaflet';
import { Polygon } from 'leaflet';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OverviewReservationComponent } from 'app/parking-management/facility-overview/overview-reservation/overview-reservation.component';
import { IBooking } from 'app/shared/model/SmartParking/booking.model';
import { IUser } from '../../../../../../../jhipster-registry/src/main/webapp/app/core/user/user.model';

@Component({
  selector: 'jhi-facility-overview',
  templateUrl: './facility-overview.component.html',
  styleUrls: ['./facility-overview.component.scss']
})
export class FacilityOverviewComponent implements OnInit {
  parkingAreas?: IParkingArea[] | null;
  parkingSpots?: IParkingSpot[];

  selectedParkingArea: IParkingArea | undefined;
  freeSpotsMap: Map<number, number>;
  selectedFreeSpots: number | undefined;

  allBookings: IBooking[] = [];
  currentUser?: IUser;
  reservedBookings: IBooking[] = [];

  faLock = faLock;

  private map: any;
  private garbePolygon: Polygon;
  private fruwirthPolygon: Polygon;
  private emilWolffPolygon: Polygon;
  private schwerzPolygon: Polygon;
  private genoPolygon: Polygon;

  private colorFree = '#38ee0a';
  private colorOccupied = '#ff0000';

  private garbePoints: any = [
    [48.710733, 9.204782],
    [48.71062, 9.204826],
    [48.710967, 9.207691],
    [48.711055, 9.207663]
  ];

  private fruwirthPoints: any = [
    [48.71354914476217, 9.211321206642236],
    [48.71342879917966, 9.211362780881966],
    [48.71391725887464, 9.216043235612954],
    [48.71404468236297, 9.216009708000268]
  ];

  private emilWolffPoints: any = [
    [48.71522333433067, 9.21069893415078],
    [48.71357746132798, 9.211121382070626],
    [48.713593389389246, 9.211251469207848],
    [48.715237492144425, 9.210842432333077]
  ];

  private schwerzPoints: any = [
    [48.71637541339545, 9.215025337291802],
    [48.71546932577789, 9.215474607301797],
    [48.714096005621265, 9.21606066997155],
    [48.714083617253365, 9.216143818451012],
    [48.7153224389433, 9.21563017542466],
    [48.71639311025675, 9.215121896816338]
  ];

  private genoPoints: any = [
    [48.714461, 9.206056],
    [48.714627, 9.205643],
    [48.714734, 9.205665],
    [48.714946, 9.205069],
    [48.71507, 9.205138],
    [48.714727, 9.20612]
  ];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    capacity: [null, [Validators.required, Validators.min(0)]],
    fullyOccupied: []
  });

  constructor(protected parkingManagementService: ParkingManagementService, private fb: FormBuilder, protected modalService: NgbModal) {
    this.garbePolygon = L.polygon(this.garbePoints);
    this.fruwirthPolygon = L.polygon(this.fruwirthPoints);
    this.emilWolffPolygon = L.polygon(this.emilWolffPoints);
    this.schwerzPolygon = L.polygon(this.schwerzPoints);
    this.genoPolygon = L.polygon(this.genoPoints);
    this.selectedParkingArea = undefined;
    this.freeSpotsMap = new Map();
    this.selectedFreeSpots = 0;
  }

  async ngOnInit(): Promise<void> {
    await this.loadParkingAreasOfFacility();
    this.initMap();
    await this.getFreeSpots();
    await this.getAllBookings();
  }

  trackId(index: number, item: IParkingArea): number {
    return item.id!;
  }

  trackId1(index: number, item: IParkingSpot): number {
    return item.id!;
  }

  async loadParkingAreasOfFacility(): Promise<void> {
    await this.parkingManagementService.getAllParkingAreasOfFacility(1).then((res: HttpResponse<IParkingArea[]>) => {
      this.parkingAreas = res.body;
    });
  }

  async getFreeSpots(): Promise<void> {
    if (this.parkingAreas) {
      for (let i = 0; i < this.parkingAreas.length; i++) {
        await this.parkingManagementService.numberOfFreeParkingSpotsInArea(this.parkingAreas[i].id).then((res: HttpResponse<number>) => {
          // @ts-ignore
          this.freeSpotsMap.set(this.parkingAreas[i].id, res.body);
        });
      }

      this.parkingAreas?.forEach(area => {
        switch (area.id) {
          case 3:
            this.changeColorOfParkingArea(this.garbePolygon, area);
            break;
          case 4:
            this.changeColorOfParkingArea(this.genoPolygon, area);
            break;
          case 5:
            this.changeColorOfParkingArea(this.schwerzPolygon, area);
            break;
          case 6:
            this.changeColorOfParkingArea(this.fruwirthPolygon, area);
            break;
          case 7:
            this.changeColorOfParkingArea(this.emilWolffPolygon, area);
            break;
        }
      });
    }
  }

  changeColorOfParkingArea(areaPolygon: Polygon, parkingArea: IParkingArea): void {
    if (parkingArea.completlyOccupied) {
      areaPolygon.setStyle({ color: this.colorOccupied });
    } else {
      areaPolygon.setStyle({ color: this.colorFree });
    }

    areaPolygon.addTo(this.map).bindTooltip(this.buildTooltip(parkingArea));
  }

  buildTooltip(parkingArea: IParkingArea): any {
    let freeSpots: number | undefined = -2;

    if (parkingArea.completlyOccupied) {
      freeSpots = 0;
    } else {
      if (parkingArea.id != null) {
        freeSpots = this.freeSpotsMap.get(parkingArea.id);
      }
    }
    return `<div><b>${parkingArea.name}</b><br> freie Parkplätze: ${freeSpots}</div>`;
  }

  private initMap(): void {
    let garbeArea: IParkingArea;
    let genoArea: IParkingArea;
    let schwerzArea: IParkingArea;
    let fruwirthArea: IParkingArea;
    let emilWolffArea: IParkingArea;

    this.map = L.map('map').setView([48.71309253793795, 9.211424471689309], 16);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    tiles.addTo(this.map);

    this.parkingAreas?.forEach(area => {
      switch (area.id) {
        case 3:
          this.changeColorOfParkingArea(this.garbePolygon, area);
          garbeArea = area;
          break;
        case 4:
          this.changeColorOfParkingArea(this.genoPolygon, area);
          genoArea = area;
          break;
        case 5:
          this.changeColorOfParkingArea(this.schwerzPolygon, area);
          schwerzArea = area;
          break;
        case 6:
          this.changeColorOfParkingArea(this.fruwirthPolygon, area);
          fruwirthArea = area;
          break;
        case 7:
          this.changeColorOfParkingArea(this.emilWolffPolygon, area);
          emilWolffArea = area;
          break;
      }
    });

    this.garbePolygon.on('click', () => {
      this.selectedParkingArea = garbeArea;
      if (garbeArea.id != null) {
        this.selectedFreeSpots = this.freeSpotsMap.get(garbeArea.id);
      }
    });

    this.genoPolygon.on('click', () => {
      this.selectedParkingArea = genoArea;
      if (genoArea.id != null) {
        this.selectedFreeSpots = this.freeSpotsMap.get(genoArea.id);
      }
    });

    this.schwerzPolygon.on('click', () => {
      this.selectedParkingArea = schwerzArea;
      if (schwerzArea.id != null) {
        this.selectedFreeSpots = this.freeSpotsMap.get(schwerzArea.id);
      }
    });

    this.fruwirthPolygon.on('click', () => {
      this.selectedParkingArea = fruwirthArea;
      if (fruwirthArea.id != null) {
        this.selectedFreeSpots = this.freeSpotsMap.get(fruwirthArea.id);
      }
    });

    this.emilWolffPolygon.on('click', () => {
      this.selectedParkingArea = emilWolffArea;
      if (emilWolffArea.id != null) {
        this.selectedFreeSpots = this.freeSpotsMap.get(emilWolffArea.id);
      }
    });
  }

  openReservationModal(parkingArea: IParkingArea): void {
    const modalRef = this.modalService.open(OverviewReservationComponent, { centered: true });
    modalRef.componentInstance.currentParkingArea = parkingArea;
  }

  async getAllBookings(): Promise<void> {
    await this.parkingManagementService.getAllBookings().then((res: HttpResponse<IBooking[]>) => (this.allBookings = res.body || []));

    await this.parkingManagementService
      .getCurrentUserInformation()
      .then((res: HttpResponse<IUser>) => (this.currentUser = res.body || undefined));

    for (const booking of this.allBookings) {
      if (booking.userId === this.currentUser?.id && !booking.bookingActive && booking.reserved) {
        this.reservedBookings.push(booking);
      }
    }
  }

  trackId3(index: number, item: IBooking): number {
    return item.id!;
  }
}

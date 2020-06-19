import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { HoraireService } from '../../services/horaires/horaire.service';
import { Horaires } from '../../entites/Horaires';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Rdv } from '../../entites/Rdv';
import { RdvService } from '../../services/rdv.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-reservation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Day;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  /*
  events: MyEvent[] = [

  ];
  */

  event: CalendarEvent;


  events: CalendarEvent[] = [
   /*
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    }
    */
  ];

  activeDayIsOpen: boolean = true;
  openHoraires: string;
  public horairesList: Horaires[] = [];

  constructor(private modal: NgbModal, private horaireService: HoraireService, private rdvService: RdvService) {
    this.getAllRdv();
    this.rdvs.forEach(rdv => {
      let endDate: Date = rdv.start;
      endDate.setHours(this.heureRDV.getHours());
      endDate.setMinutes(this.heureRDV.getMinutes() + 30);
      this.events.push(
        {
          title: rdv.title,
          start: rdv.start,
          end: endDate,
          color: colors.red,
          }
      );
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  title: string;
  heureRDV: Date;
  reservationDisabled: boolean = false;

  addReservation(eventToAdd: CalendarEvent) {
//    let startDate = new Date();
    let startDate = this.viewDate;
    let endDate = this.viewDate;
    console.log("HEURE RDV FIXE : " + this.heureRDV);
    startDate.setHours(this.heureRDV.getHours());
    startDate.setMinutes(0);
    endDate.setHours(this.heureRDV.getHours());
    endDate.setMinutes(this.heureRDV.getMinutes() + 30);
    console.log("START HOUR " + startDate);
    console.log("END HOUR " + endDate);

    this.events = [ 
      ...this.events,
      {
        title: this.title,
        start: startDate,
        end: endDate,
        color: colors.red,
      },
    ];  
    let rdvTmp: Rdv = new Rdv(this.title, startDate);
    this.saveRdv(rdvTmp);
    this.reservationDisabled = true;
    this.title = "";
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  rdvs: Rdv[] = [];

  getAllRdv() {
    let tmp: Observable<Rdv[]> = this.rdvService.getRdvs(this.viewDate);
    tmp.subscribe(rdv => {
      this.rdvs = rdv;   
    }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
            console.log('Client-side error occured.');
        } else {
            console.log('Server-side error occured.' + JSON.stringify(err));
        }
    });  
  }

  rdvTmp: Rdv;
  saveRdv(rdv: Rdv) {
    let tmp: Observable<Rdv> = this.rdvService.saveRdv(rdv);
    tmp.subscribe(rdv => {
      this.rdvTmp = rdv;
    }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
            console.log('Client-side error occured.');
        } else {
            console.log('Server-side error occured.');
        }
    });  
  }
}
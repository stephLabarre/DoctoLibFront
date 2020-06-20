import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
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
export class ReservationComponent implements OnInit {
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

  ngOnInit() {    
    console.log("On Init");
  }

  activeDayIsOpen: boolean = true;
  openHoraires: string;
  public horairesList: Horaires[] = [];

  constructor(private modal: NgbModal, private horaireService: HoraireService, private rdvService: RdvService) {
    console.log("Constructeur");
    this.getAllRdv();
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
    let selectedDate: Date = new Date(this.viewDate);
    let startDate: Date = new Date();
    let endDate: Date = new Date();

    startDate.setFullYear(selectedDate.getFullYear());
    startDate.setMonth(selectedDate.getMonth());
    startDate.setDate(selectedDate.getDate());

    endDate.setFullYear(selectedDate.getFullYear());
    endDate.setMonth(selectedDate.getMonth());
    endDate.setDate(selectedDate.getDate());

    startDate.setHours(this.heureRDV.getHours());
    startDate.setMinutes(this.heureRDV.getMinutes());
    endDate.setHours(this.heureRDV.getHours());
    let minutes: number = this.heureRDV.getMinutes() + 30; 
    endDate.setMinutes(minutes);

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
    let dateJour: Date = new Date();

    dateJour.setFullYear(this.viewDate.getFullYear());
    dateJour.setMonth(this.viewDate.getMonth());
    dateJour.setDate(this.viewDate.getDate());
    console.log("Before RDV Service");
    let tmp: Observable<Rdv[]> = this.rdvService.getRdvs(dateJour);
    tmp.subscribe(rdv => {
      this.rdvs = rdv;   
      console.log("After Get All RDVs TAB SIZE " + this.rdvs.length);
      this.rdvs.forEach(rdv => {

        let currentDate: Date = new Date(rdv.start);
        let startDate: Date = new Date();
        let endDate: Date = new Date();

        startDate.setFullYear(currentDate.getFullYear());
        startDate.setMonth(currentDate.getMonth());
        startDate.setDate(currentDate.getDate());
        startDate.setHours(currentDate.getHours());
        startDate.setMinutes(currentDate.getMinutes() + 30);

        endDate.setFullYear(currentDate.getFullYear());
        endDate.setMonth(currentDate.getMonth());
        endDate.setDate(currentDate.getDate());
        endDate.setHours(startDate.getHours());
        endDate.setMinutes(startDate.getMinutes() + 30);

        console.log("Rdv = " + rdv.title + " start:" + startDate + " end:" + startDate);
  
        this.events.push(
          {
            title: rdv.title,
            start: startDate,
            end: endDate,
            color: colors.red,
            }
        );
      });
      console.log("Taille des EVENTS Recuperer : " + this.events.length);
      this.ngOnInit();

      this.refresh.next();
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
import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { HoraireService } from '../../services/horaires/horaire.service';
import { Horaires } from '../../entites/Horaires';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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

  public minAM: string = "08:25";
  public maxAM: string = "12:00";
  public minPM: string = "13:00";
  public maxPM: string = "18:00";

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

  constructor(private modal: NgbModal, private horaireService: HoraireService) {
    this.retreiveHoraires();
  }

  public horairesList: Horaires[] = [];

  public jours: string[] = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

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

  addEvent(): void {
    let hour: number = 30;
    this.events = [
      ...this.events,
      {
        title: 'User 1',
        start: startOfDay(new Date()),
        end: endOfDay(hour),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  addReservation(eventToAdd: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToAdd);

  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  retreiveHoraires() {
    console.log("Etape 1");
    let horaires: Horaires[] = [];
    let tmp: Observable<Horaires[]> = this.horaireService.getHoraires();
    
    tmp.subscribe(horaire => {
      horaires = horaire;   
      this.formatHoraire(horaires);
      console.log("Etape 3");
      console.log("Data from BDD = " + JSON.stringify(horaires));
      console.log("Data Target Retreive = " + JSON.stringify(this.horairesList));
    }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
            console.log('Client-side error occured.');
        } else {
            console.log('Server-side error occured.');
        }
    });  
    console.log("Etape 4");
  }

  formatHoraire (horaires: Horaires[])  {
    console.log("Etape 2");
    for (let entry of this.jours) {
      console.log("Jour de la semaine : " + entry);
      let h: Horaires = horaires.find(e => e.jour === entry);
      if (h != null) {
        console.log("DATA Before: " + JSON.stringify(h));
        let dateDAM: Date;
        let dateFAM: Date;
        let dateDPM: Date;
        let dateFPM: Date;

        if (h.debutAMHour != null) {
          dateDAM = new Date(h.debutAMHour);
          console.log("DEBUT AM BDD = " + h.debutAMHour);
          console.log("DEBUT AM DATA = " + dateDAM);
        } else {
          dateDAM = null;
        }
        if (h.finAMHour != null) {
          dateFAM = new Date(h.finAMHour);
          console.log("DEBUT AM BDD = " + h.finAMHour);
          console.log("DEBUT AM DATA = " + dateFAM);
        } else {
          dateFAM = null;
        }
        if (h.debutPMHour != null) {
          dateDPM = new Date(h.debutPMHour);
        } else {
          dateDPM = null;
        }
        if (h.finPMHour != null) {
          dateFPM = new Date(h.finPMHour);
        } else {
          dateFPM = null;
        }
        let horaireTmp: Horaires = new Horaires(h.jour, dateDAM, dateFAM, dateDPM, dateFPM); 
        console.log("DATA After: " + JSON.stringify(horaireTmp));
        this.horairesList.push(horaireTmp);
      } else {
        this.horairesList.push(new Horaires(entry, null, null, null, null));
      }
    }
  }
}

interface MyEvent extends CalendarEvent {
  id: number;
  userName: string;
}
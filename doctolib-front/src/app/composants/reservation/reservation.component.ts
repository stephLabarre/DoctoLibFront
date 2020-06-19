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

  constructor(private modal: NgbModal, private horaireService: HoraireService) {
    //this.retreiveHoraires();  
  }

  public jours: string[] = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

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
    let startDate = new Date();
    let endDate = new Date();
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
    this.reservationDisabled = true;
    this.title = "";
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  horaires: Horaires[];

  retreiveHoraires() {
    console.log("Etape 1");
    let horaires: Horaires[] = [];
    let tmp: Observable<Horaires[]> = this.horaireService.getHoraires();
    
    tmp.subscribe(horaire => {
      this.horaires = horaire;   
      this.formatHoraire(horaires);
      
      console.log("VIEW DATE " + this.viewDate);

    }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
            console.log('Client-side error occured.');
        } else {
            console.log('Server-side error occured.');
        }
    });  
  }

  formatHoraire (horaires: Horaires[])  {
    console.log("Passage dans formatHoraire");
   for (let entry of this.jours) {
      let h: Horaires = horaires.find(e => e.jour === entry);
      if (h != null) {
        let dateDAM: Date;
        let dateFAM: Date;
        let dateDPM: Date;
        let dateFPM: Date;

        if (h.debutAMHour != null) {
          dateDAM = new Date(h.debutAMHour);
        } else {
          dateDAM = null;
        }
        if (h.finAMHour != null) {
          dateFAM = new Date(h.finAMHour);
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
        this.horairesList.push(horaireTmp);
      } else {
        this.horairesList.push(new Horaires(entry, null, null, null, null));
      }
    }
    
    console.log("ETAPE 1");
    this.horairesList.forEach(h => {
        console.log("Jour trouve OK" + h.jour);
        console.log("Date Matin debut:"+h.debutAMHour);
        console.log("Date Matin fin:"+h.finAMHour);
        console.log("Date Après-Midi debut:"+h.debutPMHour);
        console.log("Date Après-Midi fin:"+h.finPMHour);
    });
    console.log("ETAPE 2");
/*
    console.log("Taille TAB + " + this.horairesList.length);
    console.log("Taille du tableau des horaires"+ this.horairesList.length);
    this.horairesList.forEach(h => {
      console.log("JOUR " + h.jour);
      let jour: string = this.getDayOfADate(this.viewDate);
      console.log("Aujourd'hui" + jour);
      if (jour === h.jour) {
        console.log("Jour trouve OK");
        console.log("Date Matin debut:"+h.debutAMHour);
        console.log("Date Matin fin:"+h.finAMHour);
        console.log("Date Après-Midi debut:"+h.debutPMHour);
        console.log("Date Après-Midi fin:"+h.finPMHour);
        this.openHoraires = h.jour + ": Matin de " + h.debutAMHour.getHours() + "H" + h.debutAMHour.getMinutes() + "mn à " 
        + h.finAMHour.getHours() + "H" + h.finAMHour.getMinutes() + "mn\n" 
        + "Après-mide de " + h.debutPMHour.getHours() + "H" + h.debutPMHour.getMinutes() + "mn à " 
        + h.finPMHour.getHours() + "H" + h.finPMHour.getMinutes() + "mn\n";
      }
    });
    */
  }

  getDayOfADate(d: Date) {
    let dayNumber: number = d.getDay();
    console.log("Numéro du jour: " + dayNumber);
    switch (dayNumber) {
      case 0:
        return "Dimanche";
        break;
      case 1:
        return "Lundi";
        break;
      case 2:
        return "Mardi";
        break;
      case 3:
        return "Mercredi";
        break;
      case 4:
        return "Jeudi";
        break;
      case 5: 
        return "Vendredi";
        break;
      case 6:
        return "Samedi";
        break;
      default:
        return "Unknown";
        break;
    }
  }
}
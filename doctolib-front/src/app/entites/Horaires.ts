export class Horaires {
    jour: string;
    debutAMHour: Date;
    finAMHour: Date;
    debutPMHour: Date;
    finPMHour: Date;

    constructor (jour: string, debutAMHour: Date, finAMHour: Date, debutPMHour: Date, finPMHour: Date) {
        this.jour = jour;
        this.debutAMHour = debutAMHour;
        this.finAMHour = finAMHour;
        this.debutPMHour = debutPMHour;
        this.finPMHour = finPMHour;
    }

    toJson(horaires: Horaires ) {
        return JSON.stringify(horaires);
    }
}
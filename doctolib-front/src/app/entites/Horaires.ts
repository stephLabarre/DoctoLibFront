export class Horaires {
    public jour: string;
    public debutAMHour: Date = new Date();
    public finAMHour: Date = new Date();
    public debutPMHour: Date = new Date();
    public finPMHour: Date = new Date();

    constructor (jour: string, debutAMHour: Date, finAMHour: Date, debutPMHour: Date, finPMHour: Date) {
        this.debutAMHour = debutAMHour;
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
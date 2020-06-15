export class Horaires {
    jour: string;
    debutAMHour: number;
    finAMHour: number;
    debutPMHour: number;
    finPMHour: number;

    constructor (jour: string, debutAMHour: number, finAMHour: number, debutPMHour: number, finPMHour: number) {
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
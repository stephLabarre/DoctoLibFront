import { Utilisateur } from './Utilisateur';

export class Rdv {

    public title: string;
    public start: Date;

    constructor (title: string, start: Date) {
        this.title = title;
        this.start = start;
    }

    toJson(rdv: Rdv ) {
        return JSON.stringify(rdv);
    }
}
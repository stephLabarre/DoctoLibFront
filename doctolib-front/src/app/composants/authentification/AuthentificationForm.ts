export class AuthentificationForm {
    public login: string;
    public mdp: string;

    constructor (login: string, mdp: string) {
        this.login = login;
        this.mdp = mdp;
    }
}
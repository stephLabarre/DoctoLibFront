export class Utilisateur {
    id: Number;
    nom: string;
    prenom: string;
    login: string;
    mdp: string;
    adresse: string;
    codePostal: number;
    ville: string;
    email: string;
    tel: string;
    numSecSociale: string;
    role: string;

    constructor (id: Number, nom: string, prenom: string, login: string, mdp: string, adresse: string, 
        codePostal: number, ville: string, email: string, tel: string, 
        numSecSociale: string, role: string) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.login = login;
        this.mdp = mdp;
        this.adresse = adresse;
        this.codePostal = codePostal;
        this.ville = ville;
        this.email = email;
        this.tel = tel;
        this.numSecSociale = numSecSociale;
        this.role = role;
    }

    toJson(utilisateur: Utilisateur) {
        return JSON.stringify(utilisateur);
    }
}
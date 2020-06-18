export class CreationCompteForm {
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

    constructor (nom: string, prenom: string, login: string, mdp: string, adresse: string, 
        codePostal: number, ville: string, email: string, tel: string, 
        numSecSociale: string, role: string) {
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
}
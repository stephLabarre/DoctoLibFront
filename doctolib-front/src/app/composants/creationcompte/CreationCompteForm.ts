export class CreationCompteForm {
    nom: string;
    prenom: string;
    login: string;
    mdp: string;
    adresse: string;
    codePostal: string;
    ville: string;
    email: string;
    tel: string;
    numSecuSociale: string;

    constructor (nom: string, prenom: string, login: string, mdp: string, adresse: string, 
        codePostal: string, ville: string, email: string, tel: string, 
        numSecuSociale: string) {
        this.nom = nom;
        this.prenom = prenom;
        this.login = login;
        this.mdp = mdp;
        this.adresse = adresse;
        this.codePostal = codePostal;
        this.ville = ville;
        this.email = email;
        this.tel = tel;
        this.numSecuSociale = numSecuSociale;
    }
}
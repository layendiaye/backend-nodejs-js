class Entity {
    id;   
}

class Person extends Entity
{
    firstName;
    lastName;
}

class company extends Entity
{
    name;
}

class IDatatProvider{
    list(){}
    search(text){}
}

class BaseProvider extends IDatatProvider
{
    //donne un tableau d'objet
    getData(){}
    list(){
        return this.getData();
    }
    search(texte){
          // 1. Est-ce que je dois parcourir tous les éléments du tableau pour construire mon resultat ?
    // // -- oui : for, -- non : il n'y a pas de boucle
    // recherche = recherche.toLowerCase();
    // let listeFiltree = [];
    // for (const element of data) {
    //     // includes : string -> boolean (true ou false)
    //     let text = JSON.stringify(element);
    //     text = text.toLowerCase();
    //     if (text.includes(recherche) === true) {
    //         listeFiltree.push(element);
    //     }
    // }
    let text = texte.toLowerCase();
    return this.getData().filter(x => JSON.stringify(x).toLowerCase().includes(text));

        // let text = text.toLowerCase();
        // return this.getData().filter(x => JSON.stringify(x).toLowerCase().includes(text));
        //     //La méthode filter() crée et retourne un nouveau tableau contenant tous les éléments du tableau 
        //     //d'origine qui remplissent une condition déterminée par la fonction callback.
    }

}

class PersonProvider extends BaseProvider
{
    getData(){
        let p1=new Person();
        let p2=new Person();
        let p3=new Person();
        p1.id=1;
        p1.firstName="Sophie";
        p1.lastName="Lozopie";
        p2.id=2;
        p2.firstName="Annie";
        p2.lastName="Versaire";
        p3.id=3;
        p3.firstName="Paul";
        p3.lastName="Ochon";

        return [p1,p2,p3];

     }
}
class CompanyProvider extends BaseProvider
{
    getData(){
        let c1=new company();
        let c2=new company();
        let c3=new company();
        c1.id=1;
        c1.name="Google";
        c2.id=2;
        c2.name="Apple";
        c3.id=3;
        c3.name="Microsoft";

        return [c1,c2,c3];

    }
}

class RepositoryService
{
    providers;
    constructor(providers){//une dependance: ce qu'on exige lors de linstanciation
        this.providers=providers;
    }
    list(){
        let resultat=[];
        for(const provider of this.providers)
        {
            resultat=resultat.concat(provider.list());
        }
        return resultat;
        //return JSON.stringify(resultat);
       // Array.prototype.concat
    }
    search(text){
        let resultat=[];
        for(const provider of this.providers)
        {
            let result=provider.search(text);
            resultat=resultat.concat(result);
           //ou  resultat=resultat.concat(provider.search(text));
        }
        return resultat;
    }
}

const pers=new PersonProvider();
const comp=new CompanyProvider();
const serv=new RepositoryService([pers,comp]);
//ber.providers=[jose,sop];
console.log(serv.list());
console.log(serv.search('so'));
const express=require('express');
const cors=require('cors');

//on defini le serveur
let app=express();// creation du serveur
app.use(cors());//utiliation de cors:autoriser les requetes http provenant d'une autre origine
//(c'est a dire sauter les limitation de sécurité coté navigateur), permettre au backend de tjours repondre oui
app.use(express.json());//utilisation du json:permettre la communication des dnnées au format json

//GET(recuperation de données)-- list
//POST(envoie de données avec intention de creation)
//PUT (envoie de données avec intention de modification)
//PATCH(envoie de données avec une intention de modification partielle (par exple juste le nom))
//DELETE(suppression de données)

app.get('/',function (req,res) {//un endpoint
    // '/' est le debut l'uri. exple get('/spectacle/id)
    res.send(serv.list());
});

//creer un nveau endpoint qui accepte les requetes en post avec une donnée texte 
app.post('/', function(req,res){//on peut mettre post('/search'
    res.send(serv.search(req.body.text));//le payload=données envoyer un requete post
//req.body.text=payload, c'est ce que le client envoie au serveur(serv)
});
 //lancer le serveur
app.listen(4000, function()
{
    console.log("listen on port 4000 haha...");
})




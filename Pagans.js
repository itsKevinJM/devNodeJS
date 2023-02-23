
const { generateKey } = require('crypto');
const fs = require('fs-extra');
const UUID = require('uuid');
const glob = require('glob');
const conf = require('./config');

const genereTxtAlea = (nBchar) => {

    let txt = ""
    //     // faire une boucle de nb de char
    for (let i = 0; i < nBchar; i++) {
        // console.log(nBchar)
        let charNom = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        // (extraire de façon aléatoire un caractères dans une chaine de caractère autorisé)
        let debutrandomstr = Math.floor(Math.random() * charNom.length);

        // utilisation de subtring pour extraire la chaine entre debutrandom et endrandom
        txt += charNom.substring(debutrandomstr, debutrandomstr + 1);
    }
    //     //fonction delete dans pagans.init avant de générer les nouveau nom
    //console.log(txt);
    return txt
    //     // me sortir une chaine de texte avec un certains nombre de caractères correspondant à la variable nbchar
}

const Pagans = {}
Pagans.init = (nbPagan) => {
    //console.log(`${config.maindir}/data/toto.json`)
    //fonction glob pour lister tout les fichiers dans pagans et fs.remove pour delete tous les fichiers qui se trouvent dans data pagans
    glob.sync(`${conf.maindir}/data/pagans/*.json`)
        .forEach(f => {
            fs.remove(f, err => {
                if (err) return console.error(err)
                //console.log('success!')
            })
        })
    for (let i = 1; i <= nbPagan; i++) {
        // console.log(UUID.v4())
        const ID = (UUID.v4());
        const data = { UUID: ID, nom: genereTxtAlea(Math.floor(Math.random() * (255 - 10)) + 10) };
        //console.log(data);
        fs.outputJson(`${conf.maindir}/data/pagans/${ID}.json`, data, {
            spaces: 2
        }, err => {
            if (err) throw err;
        });
    }
}



Pagans.update = (UUID, data) => {
    // vérifier si UUID existe
    // si il existe on l'ecrase avec les nouvelles data
    if (fs.existsSync(`${conf.maindir}/data/pagans/${UUID}.json`)) {
        fs.writeJsonSync(`${conf.maindir}/data/pagans/${UUID}.json`, data)
        console.log(`Le pagan ${UUID} à été update`)
    } else {
        console.log(`Le pagan ${UUID} n'existe pas`)
    }
}

Pagans.get = (UUID) => {
    // récupérer les info du fichier et les lire
    const info = fs.readJsonSync(`${conf.maindir}/data/pagans/${UUID}.json`)
    console.log(info)

}



// passer la chaine de texte en variable (searchstring)
Pagans.search = (searchstring) => {
    // rechercher tout les pagans existant via leurs champs "nom" si une chaine de texte existe
    glob.sync(`${conf.maindir}/data/pagans/*.json`)
    //parcourir et exécuter une action sur chaque élément du tableau
    // incrémenter un compteur
    const paganList = ["pagan1", "pagan2", "pagan3", "pagan4"];
    let counter = 0;
    const allPagans = {
        nombre: paganList.length,
        liste: paganList
    };

    console.log(allPagans)
    paganList.forEach(a => {
        console.log(a);
        counter++;

        console.log(counter)

        //la fonction doit me retourner un objet avec un champ nombre de pagans et une clé correspondant a liste des uuid des pagans 
        // console.log(a)
        // const Pagan = fs.readJsonSync(a)
        // if (Pagan.nom.includes(searchstring)) {
        //     //     //     // afficher les pagans qui répondent aux critères recherchés puis retourner dans un ojbet la liste des UUID.
        //     return allPagans
        // }
        // else {
        //     return ("error")
        // }
    })
}


//récupérer les infos et les lire // utiliser get dans main.js //
// faire la fonction search pour récuperer les UUID et les afficher avec la fonction get


module.exports = Pagans;
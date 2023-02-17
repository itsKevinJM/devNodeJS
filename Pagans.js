
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

Pagans.search = (searchstring) => {
    //console.log(`liste des Pagans contenant ${searchstring} dans le nom`)
    glob.sync(`${conf.maindir}/data/pagans/*.json`)
        .forEach(f => {
            const pagan = fs.readJsonSync(f);
            //console.log(pagan.nom)
            if (pagan.nom.includes(searchstring)) {

                //console.log(pagan)
            }
        })
}


Pagans.update = (UUID, data) => {
    // vérifier si UUID existe
    // si il existe on l'ecrase avec les nouvelles data
    glob.sync(`${conf.maindir}/data/pagans/*.json`)
        .forEach(f => {
            console.log(f)
            fs.writeJsonSync(f, data)
            if (!fs.pathExistsSync(`${conf.maindir}/data/pagans/${UUID}.json`)) {
                console.log(`n'existe pas ${conf.maindir}/data/pagans/${UUID}.json`)
            } else {
                fs.writeJsonSync(f, data)
            }

            const postPagans = fs.readJsonSync(f, data)
            console.log(postPagans)

            //const PagData = Pagans.PagData(UUID, data)
            //let newData = "it's a new data";
            //glob.sync me génère le tableau
            //const Pag = fs.writeJsonSync('C:/Users/keke-/OneDrive/Documents/informatique/stage/testkevin/data/pagans/*.json', UUID, data, { data: newData })(f)
            // if (Pag.status === (err)) {
            //     return console.error(err)
            // } else {
            //     return console.log(newData)
            // }

        })
    //console.log(Pagans.updatePag)

}



//TextG.init = (randomText) => {


// faire ma boucle
// for (let i = 10; i <= randomText; i++) {
//     const UniqueID = (UUID.v4())

//générer ma chaine de caractere entre 10 et 255
// generaterandomtext(length) = () => {
//     let all = "";
//     const charactersName = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

// }
// const randomLg = randomText(10, 255);
// const randomStr = generaterandomtext(randomLg)



//console.log(randomStr);

// }
//}



// utiliser glob.sync et read-json sync




module.exports = Pagans;
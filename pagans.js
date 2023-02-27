
const { generateKey } = require('crypto');
const fs = require('fs-extra');
const UUID = require('uuid');
const glob = require('glob');
const conf = require('./config');

const genereTxtAlea = (nBchar) => {
    /*
    Allows you to generate a random name:
    1. Initialize a txt variable before assigning it a value later in the program
    2. Make a tank number loop
    3. (randomly extract a character from an authorized string)
    4. Using subtring to extract the chain between debutrandom and endrandom
    5. Output a text string with a certain number of characters corresponding to the variable "nbchar"
    */

    let txt = ""
    for (let i = 0; i < nBchar; i++) {
        // console.log(nBchar)
        let charNom = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let debutrandomstr = Math.floor(Math.random() * charNom.length);

        txt += charNom.substring(debutrandomstr, debutrandomstr + 1);
    }
    //console.log(txt);
    return txt
}

const Pagans = {}
Pagans.init = (nbPagan) => {
    /*
    1.glob function to list all files in pagans and fs.remove to delete all files in data pagans
    2. ForEach to iterate over all the elements of an array and execute a function for each of these elements.
    3. fs.remove to delete all the old pagans
    4. For loop to add pagans
    5. Const ID with a UUID package to get a UUID
    6. Allows me to generate random letters with the math random and the function above genereTxtAlea
    7. fsoutputjson to write a JSON object in a file
    8. @return (error)
    */
    const res = { status: 404, info: "Not found" }
    //console.log(`${config.maindir}/data/toto.json`)
    glob.sync(`${conf.maindir}/data/pagans/*.json`)
        .forEach(f => {
            fs.remove(f, err => {
                if (err) return res
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
    /*
    Allows you to update a Pagan:
    1. Check if UUID exists
    2. If it exists, it is crushed with the new data
    3. If everything is OK the function:
     @return {
        status: 200,
        info: "The pagan 'uuid of pagan' has been updated.
     } else {
        @return (error) -> ('The pagan doesn't exist')
     }
     */
    const res = { status: 200, info: `Le pagan ${UUID} à été update` }
    if (fs.existsSync(`${conf.maindir}/data/pagans/${UUID}.json`)) {
        fs.writeJsonSync(`${conf.maindir}/data/pagans/${UUID}.json`, data)
        return res
    } else {
        return (`Le pagan ${UUID} n'existe pas`)
    }

}

Pagans.get = (UUID) => {
    /*
    Allows you to retrieve the information from the file and read it:
    @return
    {
        Two const in the object (to views the two const) -> info and res
    }
    */
    const info = fs.readJsonSync(`${conf.maindir}/data/pagans/${UUID}.json`);
    const res = { status: 200, info: "l'information à bien été récupéré" };
    return { info, res }
}


// Switch text string to variable (searchstring)
Pagans.search = (searchstring) => {
    /*
    Allows you to search the Pagans:
    1. Search all existing pagans via their "name" fields if a text string exists
    2. The constant res is an object with a key "pagans" and an array as a value
    3. myglob.forEach for browse and perform an action on each element of the array
    4. fs.readJsonSync is the method for read the files in the pagans folder

     use the method includes and (searchstring) as parameter to know the elements in pagan.name
     then return me the object in the const "res" with res.pagans (which is the key in the object of the const "res")
    .push which is the method to add an element in the array and put between parenthesis (Pagan.UUID) to return all the UUID keys
    (in our case we return all the files in which there is a string "AB" for example. (see main.js)

    @return
    { pagans : ['the uuid'], nbPagan: 1, many, or 0 }
    */
    const myglob = glob.sync(`${conf.maindir}/data/pagans/*.json`)
    const res = { pagans: [] }
    myglob.forEach(a => {
        const Pagan = fs.readJsonSync(a)
        //console.log(Pagan)
        //console.log(a.nom);

        if (Pagan.nom.includes(searchstring)) {
            res.pagans.push(Pagan.UUID);
        }
    })

    res.nbPagan = res.pagans.length;
    return res
}

Pagans.delete = (UUID, data) => {
    /*
    Allows you to retrieve the information from the file and read it:
    @return
    {
        status: 200,
        info: "The 'UUID' Pagan has been deleted"
    } or 
    @return (error) -> "The pagan has not been removed"



    */
    const res = { status: 200, info: `Le pagan ${UUID} à bien été supprimé` }
    if (fs.existsSync(`${conf.maindir}/data/pagans/${UUID}.json`)) {
        fs.removeSync(`${conf.maindir}/data/pagans/${UUID}.json`, data)
        return res
    } else {
        return (`Le pagan ${UUID} n'à pas été supprimé`)
    }
}

module.exports = Pagans;
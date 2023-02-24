const express = require('express');
const user = require("./routes/pagans");
const app = express();
const fs = require('fs-extra');
const Pagans = require("./Pagans");
//const bodyParser = require('body-parser');
//const cors = require('cors');

// create a config.js file with global param
const config = require('./config.js');

// on utiliser express.json toute la communication qui se fera en http se fera en travers de json
app.use(express.json())
app.use(user)

// const myMiddleware = (req, res, next) => {
//     res.send("ok")
//     console.log(Date.now());
//     next();
// }
//app.use(myMiddleware)

app.get('/', (req, res) => {
    //res.send("hello")
})




/*
utilisation de bodyParser.json() comme middleware pour analyser les données JSON
est utilisé pour analyser les données JSON envoyées dans le corps
 d'une requête HTTP et les transformer en un objet JavaScript utilisable dans une application Express.
 */

//app.use(bodyParser.json(config.bodyparse.json));

// create in /etc/host  127.0.0.1 myweb
// Create a static web folder to host static file ./www

//la fonction app.use permet d'appliquer un middleware à nimporte quel requete
app.use(express.static('www'));
// create a simple page ./www/index.html
// Create a route to ./pagans.js
//app.use('/routes', require('./pagans.js'));
// Create a model to ./Pagans.js 
app.listen(3018, () => {
    console.log(`check in your browser that api works http://myweb:${3018}`);
});
//console.log( "\x1b[42m\x1b[37m", "Made with love for people's freedom, enjoy !!!", "\x1b[0m" );



//console.log(Pagans)
//(Pagans.init(10))
//console.log(Pagans.search("ZM"))
//console.log(Pagans.update("fcd27ea2-5074-4f81-b982-75116bbd41ee", { UUID: "fcd27ea2-5074-4f81-b982-75116bbd41ee", nom: "toto" }))
//console.log(Pagans.get("fcd27ea2-5074-4f81-b982-75116bbd41ee"))
//console.log(Pagans.delete("c9c20a12-93a7-43da-89b2-2c64e7686b68"))


//console.log("ok");



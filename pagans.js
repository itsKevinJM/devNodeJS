
const fs = require('fs-extra');
const UUID = require( 'uuid' );
const config = require('./config');


const file = 100;
const genererfile = {}
genererfile.init=(nbPagan)=>{
    console.log(`${config.maindir}/data/pagans/toto.json`)
    for (let i = 1; i <= nbPagan; i++) {
        // console.log(UUID.v4())
const ID = (UUID.v4())
        fs.outputJson( `${config.maindir}/data/pagans/${ID}.json`, {UUID:ID,nBtest:12}, {
            spaces: 2
        }, err => {
            if( err ) throw err;
        } );
}
}





module.exports = genererfile;
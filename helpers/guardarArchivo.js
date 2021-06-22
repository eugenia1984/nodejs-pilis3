const fs = require('fs');

const archivo = './db/data.json';

const guardarDB = ( data ) => {  //voy a recibir la data
  fs.writeFileSync(archivo, JSON.stringify(data));  //transformo el array data en string con JSON.stringify
}

const leerDB = () => {
  if ( !fs.existsSync(archivo) ) {
    return null;
  }
  const info = fs.readFileSync( archivo, { encoding: 'utf-8' } );  //encoding para que no me regrese los bytes
  const data = JSON.parse( info);
  console.log(data);

  return data;
}

module.exports = {
  guardarDB,
  leerDB
}
const Tarea = require('./tarea');

class Tareas {

  _listado = {
    'abc': 123
  };


  get listadoArr() {  //uso un getter para rellenar un nuevo array

    const listado = [];
    Object.keys(this._listado).forEach( key => { //Object.keys(this._listado) para hacer un arreglo con todas las llaves, con el for each barro cada uno, la extraigo, la agrego al listado
      const tarea = this._listado[key];
      listado.push( tarea );
    });
    
    return listado;
  } 

  constructor() {
    this._listado = {};
  }

  borrarTarea( id=''){
    if( this._listado[id] ) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray( tareas = [] ) {
    tareas.forEach( tarea => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = '') {

    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto()  {

    console.log();
    this.listadoArr.forEach( (tarea, i ) => {  //el segudo argumento es el indice

      const idx = `${i + 1}`.green;  //es mi indice que es acumulador
      const { desc, completadoEn } = tarea;  //tengo el estado y la descripcion
      const estado = ( completadoEn )
                        ?'Completada'.green
                        :'Pendiente'.red;
      console.log(`${ idx} ${ desc } :: ${ estado }`);

    });
  }

  listarPendientesCompletadas( completadas = true ) {

    console.log();
    let contador = 0;
    this.listadoArr.forEach( tarea => {  //el segudo argumento es el indice
      //es mi indice que es acumulador
      const { desc, completadoEn } = tarea;  //tengo el estado y la descripcion
      const estado = ( completadoEn )
                        ?'Completada'.green
                        :'Pendiente'.red;
      if ( completadas) {
        //mostrar completadas
        if( completadoEn ) {
          contador +=1;
          console.log(`${ (contador + '.').green } ${ desc } :: ${ completadoEn }`);
        }
      } else {
        //mostrar pendientes
        if( !completadoEn ) {
          contador +=1;
          console.log(`${ (contador + '.').red } ${ desc } :: ${ estado }`);
        }
      }

    });
  }

  toggleCompletadas( ids = [] ) {

    ids.forEach( id => {

        const tarea = this._listado[id];
        if ( !tarea.completadoEn ) {
            tarea.completadoEn = new Date().toISOString()
        }
    });

    this.listadoArr.forEach( tarea => {

        if ( !ids.includes(tarea.id) ) {
            this._listado[tarea.id].completadoEn = null;
        }
    });
  }

}

module.exports = Tareas;
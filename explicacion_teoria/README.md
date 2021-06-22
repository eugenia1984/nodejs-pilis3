# Consola de tareas

El objetivo es crear una aplicación de consola interactiva, con opciones que se puedan seleccionar con las teclas direccionales, números y con la tecla espaciadora cuando hay multiples opciones.<br>
   * 1- Crear tarea <br>
   * 2- Listar tareas <br>
   * 3- Listar tareas completadas <br>
   * 4- Listar tareas pendientes <br>
   * 5- Completar tarea(s) <br>
   * 6- Borrar tarea <br>
   * 0- Salir <br>

Esta es una aplicación real que les puede servir mucho cuando tengan que crear alguna aplicación de consola.<br>

---

## Clases en JavaScript

## Archivos JSON

## Fuertemente async y await

## Transformaciones

----

## Creando proyecto

Creo el directorio **tareas-hacer** y cargo el package.json, por consola: <br>
```
npm init -y
```
Y también instalo colors, para luego poder aplciarle los colores a mi consola, por consola: <br>
```
npm i colors
```
Creo mi **.gitignore** para ignorar mis módolos de node: <br>
```
node_modules/
```
Y me creo le punto de inicio de mi aplicación: **app.js** en el cual voy a hacer el require de los colores: <br>
```
require('colors');
```
Como por defecto es un proceso **asíncrono** voy a tener que utilizar el **Async** y **Await**. <br>
Por eso me voy a crear una **constante** llamada**main** que va a ser una **función asíncrona**. Y debajo llamo a main.<br>
```
require('colors'); 
const main = async() => {

}

main();
```
## Creando el menú de manera empírica: stdin - stdout - Readline

Vamos a crear un menu y recibir un input por parte del usuario. <br>
Me creo la carpeta **helpers** y dentro mi archivo **mensajes.js** . <br>
Voy a requerir el modulo de los colores: <br>
```
require('colors');
```
Y me creo la constante llamada **mostrarMenu** que va a ser igual a iuna función, sin recibir argumento. <br>
También va a devolver una promesa, pero sin transformarla con el Async.<br>
Primero armo el menú. Antes con console.clear() para borrar lo que tenga la consola. Y tambien debo exportarla para poder utilizarla. La exporto como un objeto por si a futuro tengo muchas funciones dentro<br>
Entonces en mensjae.js: <br>
```
require('colors');

const mostrarMenu = () => {

  console.clear();
  console.log("===========================");
  console.log("    Seleccione una opción");
  console.log("==========================");

}

module.exports = {
  mostrarMenu
}
```
Ahora en mi app.js llamo a mostrarMenu. Y voy a ver que también se me va a autoimportar el modulo de mensajes.js dentro de helpers. Y modifico el orden, para que primeor quede la importación de paquete externo (colors) y luego las mias (mensajes). <br>
```
require('colors'); 
const { mostrarMenu } = require('./helpers/mensajes');

console.clear();

const main = async() => {
    console.log('Hola Mundo');

    mostrarMenu();
}

main();
```
si ahora por consola ejecuto el programa con **node app** voy a ver: <br>
```
===========================
    Seleccione una opción
==========================
```
Como me gusta que se vea con un color verde en los console.log de los mensajes que se ven agrego: **.green**, luego de que cierro las dobles comillas.<br>
Y ahora vamos a construir el menú. <br>
Primero agrego un salto de línea: <br>
```
 console.log("===========================\n".green);
```
Y ahora voy agregando las opciones del menú. <br>
```
const mostrarMenu = () => {

  console.clear();
  console.log("===========================".green);
  console.log("    Seleccione una opción".green);
  console.log("===========================\n".green);
  console.log(`1. Crear tarea`);
  console.log(`2. Listar tarea`);
  console.log(`3. Listar tareas completadas`);
  console.log(`4. Listar tareas pendiente`);
  console.log(`5. Completar tarea(s)`);
  console.log(`6. Borrar tarea`);
  console.log(`0. Salir \n`);

}
```
Si ahora corro mi programa, veo por consola: <br>
```
===========================
    Seleccione una opción
===========================

1. Crear tarea
2. Listar tarea
3. Listar tareas completadas
4. Listar tareas pendiente
5. Completar tarea(s)
6. Borrar tarea
0. Salir

```
Pero todavía no puedo escribir nada porque la aplicación se termina. <br>
Primero le voy a agregar el color verde a los números también. <br>
```
  console.log(`${'1.'.green} Crear tarea`);
  console.log(`${'2.'.green} Listar tarea`);
  console.log(`${'3.'.green} Listar tareas completadas`);
  console.log(`${'4.'.green} Listar tareas pendiente`);
  console.log(`${'5.'.green} Completar tarea(s)`);
  console.log(`${'6.'.green} Borrar tarea`);
  console.log(`${'0.'.green} Salir \n`);
```
### Ahora vamos a ver cómo recibir una información ingresada por el usuario

Primero preparo la interfaz que le voy a mostrar al usuario. <br>
En mi archivo mensaje.js: <br>
Uso el **.question** para mostrar información al usuario (es similar al System.out.println de Java), y como segundo parámetro tengo un callback que va a activar la respuesta. Y luego realizo un console.log de la opción seleccionada (opt de option)<br>
Y cuando termino de utlizar el **readline** lo tengo que cerrar con **.close()** para que no se quede esperando información del usuario infinitamente. <br>
```
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  readline.question('Seleccione una opción: ', (opt) => {
    console.log({opt});
    readline.close();
  })

```
Si ahora corro mi programa, además del menú voy a ver que me indica que seleccione una opción. <br>
Si pongo una opción, ya capturo el valor. <br>
Si por ejemplo ingreso 20, entonces veo: <br>
```
 { opt: '20' }

```
Pero, nos falta valiar que solo elijan opciones del 1 al 6 y mostrar el mensaje de error. <br>
Y si elije entre 1 y 5 debe hacer una pausa y volverse a ejecutar. Para lo cual me creo la variable **pausa** que va a ser una función. Saco el console.log que muestra opt en mostrarMenu porque ya se que tengo la opción ahí.<br>
```
const pausa = () => {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  readline.question(`\nPresione ${'ENTER'.green} para continuar\n`, (opt) => {
    readline.close();
  })
}
module.exports = {
  mostrarMenu,
  pausa
}
```
Y exporto pausa . <br>
Y también la ejecuto en app.js y me fijo que arriba lo tenga exportado. <br>
```
const { mostrarMenu, pausa } = require('./helpers/mensajes');

const main = async() => {
    console.log('Hola Mundo');

    mostrarMenu();

    pausa();
}
```

---

## Repetir el menu de manera infinita

Se podría hacer con un **do while** ya que primero se ejecuta, y luego va a ver si la condición se verifica para ejecutarse. Dentro de la constante main podría agregar una constante **opt** que la incializo como vacía y podría pensar en un do- while,  dentro del do tengo mostrarMenu(), y que lo haga mientras ( while(opt !='0') ) pero NO lo hago porque esto me daría un **ciclo infinitino**. <br>
Lo que hay que hacer es esperar la respuesta de mostrarMenu(), enotnces vamos a tratar de convertir en promesa el await, pero tengo el inconveniente que de si pongo el return en la opción seleccionada no sería el return de mi promesa/función asíncrona. Entonces esto tampoco es una opción viable. <br>
Entonces lo que hago es crear el retunr manual de una promesa: <br>
```
const mostrarMenu = () => {

  return new Promise( resolve => {
    console.clear();
    console.log("===========================".green);
    console.log("    Seleccione una opción".green);
    console.log("===========================\n".green);
    console.log(`${'1.'.green} Crear tarea`);
    console.log(`${'2.'.green} Listar tarea`);
    console.log(`${'3.'.green} Listar tareas completadas`);
    console.log(`${'4.'.green} Listar tareas pendiente`);
    console.log(`${'5.'.green} Completar tarea(s)`);
    console.log(`${'6.'.green} Borrar tarea`);
    console.log(`${'0.'.green} Salir \n`);

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question('Seleccione una opción: ', (opt) => {
      readline.close();
      resolve(opt);
    })
  });


}
```
Y tengo que hacer que la constante pausa funcione de la misma manera. En este caso en el resolve no paso como parámetro opt porque aca no necesito tener que escribe la persona. <br>
```
const pausa = () => {

  return new Promise( resolve => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question(`\nPresione ${'ENTER'.green} para continuar\n`, (opt) => {
      readline.close();
      resolve();
    })

  });
  
}
```
Como las dos funciones regresan una promesa, en app.js necesito que espere hasta tener la opción de mostrarMenu, por eso uso **await**: <br>
```
const main = async() => {
    //console.log('Hola Mundo');

    let opt='';

    do {
        opt = await mostrarMenu();
        console.log({opt});
        if ( opt !== '0' ) await pausa();
        
    } while (opt !=='0');

    
}
```
Entonces ahora si me pausa, elijo una opción, y toma ese número. <br>
¿ Cómo hago para que el usuario además de poner el número lo pueda seleccionar subiendo o bajando con flechas ? Por suerte al ser Node, tenemos muchas posibilidades de encontrar una librería (paquete) para esto. Buscamos un paquete que nos ayuda en consolas interactivas.<br>

---

## Paquete inquirer

https://www.npmjs.com/package/inquirer <br>
Es una forma muy interactiva para crear consolas. <br>
Lo instalamos: <br>
```
npm install inquirer
```
Trabaja en base a promesas, con .then() y .catch(). Esto lo podemos mezclar con el async y await.<br>
Tinene muchas funcionalidades, tiene validaciones, mucha documentación, ejemplos con expansores, listas, input. <br>
En **helpers** me creo un nuevo archivo **enquirer.js** .<br>
Importo, armo la cabeza dle menu y esporto: <br>
```
const inquirer = require('inquirer');
require('colors');

const inquirerMenu = async () => {

  console.clear();

  console.log("===========================".green);
  console.log("    Seleccione una opción".green);
  console.log("===========================\n".green);

}

module.exports = {
  inquirerMenu
}
```
Necesito las opciones del menu, y se que inquirer trabaja con promesas, fuera de mi función creo la constante **preguntas** para ahi guardar en un array (del modo que lo utiliza inquirer ) las opciones del menú. <br>
```
const preguntas = [
  
  {
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: ['opt1','opt2','opt3']
  }


];

const inquirerMenu = async () => {

  console.clear();

  console.log("===========================".green);
  console.log("    Seleccione una opción".green);
  console.log("===========================\n".green);

  const opt = await inquirer.prompt(preguntas);

  return opt;

}
```
Y en mi app.js voy a ejecutar el inquirerMenu
```
const main = async() => {
    //console.log('Hola Mundo');

    let opt='';

    do {
        opt = await inquirerMenu();
        console.log({opt});
        
        
    } while (opt !=='0');

    
}
```    
Y corroboro que se exporto. <br>

## Opciones del menu interactivo

Las opciones se pueden mandar como un objeto que tiene distintos valores y sus nome (que es lo que se quiere mostrar). <br>
Entonces en inquirer.js: <br>
```
choices: [
      {
        value: '1',
        name: '1. Crear tarea '
      },
    ]
```
Y asi hago con todas las opciones del menu. Se puede usar tanto como string como number, como ya lo teníamos como string lo seguimos manejando así. <br>
Voy a desestructurar la opción y la mando en el retunr: <br>
```
const { opcion } = await inquirer.prompt(preguntas);

  return opcion;
```

---

En mi inquirer.js coy a crear una constante llamada pausa que va a ser una arrow function asíncrona. Y para no olvidarme ya la incorporo en la parte de module.esports para luego poder exportarla. <br>
```
const pausa = async() => {

  conts question = [
    {
      type: 'input',
      name: 'enter'
      message: `Presione ${'ENTER'.green} para continuar`
    }
  ];

  await inquirer.prompt(question);
}

module.exports = {
  inquirerMenu,
  pausa
}
```
En app. agrego pausa():
```

    do {
        opt = await inquirerMenu();
        console.log({opt});

        await pausa();
        
        
    } while (opt !=='0');
```
Y confirmo que se exporto:
```
const { inquirerMenu, pausa } = require('./helpers/inquirer');
```    

---

## Lógica para el manejo de tareas por hacer

Por el momento, en vez de unsar una base de datos, nos vamso a basar en guardar la información en formato e texto (.txt). <br>
CReo una nueva carpeta llamada **models**, donde voy a tener las clases encargadas de trabajar la lógica del negocio. <br>
Y dentro voy a crear el archivo **tarea.js** <br>
Me creo la calse **Tarea**, luego la defino, y la importo. <br>
```   
class Tarea {

}

module.exports = Tarea;
```   
Defino las propiedades de mi clase Tarea, en JavaScript no es necesario definirla como privada, inclusive pueden estar en el constructor, pero para lectura de gente que viene de otros lenguajes, las defino dentro de mi clase y las inicializo en el mismo momento. <br>
Creo también el constructor, que me va a ayudar para crear una nueva instancia de mi clase (cuando creo un nuevo objeto en base a mi clase). Va a recibir como parametro la descripción (desc) que también la tengo ocmo atributo. <br>
```
class Tarea {

  id= '';
  desc='';
  completadoEn = null

  constructor ( desc ) {
    this.desc = desc;
  }
}

module.exports = Tarea;   

``` 
Para el **id** vamos a usar un módulo **uuid** . <br>
 Lo instalo: 
```
npm install uuid
```
Y en mi **packege.json** veo en las dependencias que ya me lo indica con su versión. <br>
Entonces cuando creo una nueva instancia voy a usar uuid, para lo que creo una nueva constante . <br>
```
const { v4:uuidv4  } = require('uuid');
```
Y uso el id en mi constructor : <br>
```
class Tarea {

  id= '';
  desc='';
  completadoEn = null

  constructor ( desc ) {

    this.id = uuidv4();
    this.desc = desc;
    this.completadoEn = null;

  }
}
```
Ahora hay que pensar cómo manejar varias tareas en vez de una sola. Entonces me creo un nuevo archivo **tareas.js** dentro de **models**. Y creo una nueva clase Tareas, y la exporto así ya queda exportada. <br>
Defino sus atributos, como el listado, el cual en vez de manejrlo como un array (y tener que ir recorriendolo completo) lo manejo como un objeto, el cual va a tener el uuid y la tarea de cada uno y la fecha; asi tengo varias propiedades, entonces busco directamente por por uuid, en vez de ir recorriendolo todo como array. <br>
Y creo mi constructor que solo tiene como atributo este listado que lo defino como vacío. <br>
Usualmente en el contructor se definen las propiedades, pero ayuda a que sea fácil de observar. <br>
Solo faltan crear los métodos, pero ya tengo los modelos. <br>
```
class Tareas {

  _listado = {};

  constructor() {
    this._listado = {};
  }

}

module.exports = Tareas;
```
Para probarlo voy a mi **app.js** , comento dentro del do la variable opt y su console.log y creo una constante tarea que va a requerir un argumento que es la descripción (en este caso para ejemplo pongo comprar comida). Y la mando a imprimir por consola. <br>
```
   const tarea = new Tarea('Comprar comida');
        console.log(tarea);
```
Y me aseguro de que está importada:
```
const Tarea = require('./models/tarea');
```
Si lo ejecuto por consola, voy a ver que mi tarea ya tiene creado el id (que es único): <br>
```
Tarea {
  id: 'ee89c5c8-2d2b-4e1b-bd60-a3af5640a986',
  desc: 'Comprar comida',
  completadoEn: null
}
```
EN mi app.js  ahora creo otra constante tareas que también es instancia de la clase Tareas, me fijo que se importo, comoento la tarea y mando a imprimir tareas y voy a ver por consola:
```
Tareas { _listado: {} }
```
Voy a tener el listado de tareas, donde la tarea va a tener un id: <br>
```
tareas._listado[tarea.id] = tarea;
```
Ejecuto nuevamente el programa: <br>
```
Tareas {
  _listado: {
    '152e985f-23a3-4c6b-b336-6b2152e4d1d9': Tarea {
      id: '152e985f-23a3-4c6b-b336-6b2152e4d1d9',
      desc: 'Comprar comida',
      completadoEn: null
    }
  }
}
```
Y en las Tareas tengo un objeto en el cual tengo la información de la tarea; es similar a como se trabaja en base de datos no relacionales, como FireBase o como Mongodb. <br>
Es una demostración.<br>
Por el momento solo vamosa  tener que tener exportado el modelo de tareas (saco el de tarea), porque es el encargado de insertar, actualizar y hacer todas las interacciones con nuestros modelos. <br>
SAco en app.js todo loq ue puse de tarea y tareas dentro del do, y me queda:
```
require('colors');  
const { inquirerMenu, pausa } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

console.clear();

const main = async() => {

    let opt='';

    do {
       opt = await inquirerMenu();
       console.log({opt});
        

        await pausa();
        
        
    } while (opt !=='0');

    
}

main();
```
Si ejecuto nuevamente el programa: <br>
```
? ¿Qué desea hacer? (Use arrow keys)
> 1. Crear tarea 
  2. Listar tareas
  3. Listar tareas completadas
  4. Listar tareas pendientes
  5. Completar tarea(s)
  6. Borrar tarea
  0. Salir
```
---

## Crear y listar tareas

Voy a querer crear tareas y listarlas, que esas opciones del menú ya funcionen. <br>
Por ahora solo exporté el model Tareas en app.js pero todavia no cree la nueva instancia; lo hago ahora: <br>
```
const tareas = new Tareas();
```
Voy a tareas.js para crear un meétodo que cree mis tareas, la llamo crearTarea y va a recibir como parámetro la descripción (desc) que la inicializo como string vacío, asi ya se sabe que es de tipo string. Y le mando como parámetro la descripción. <br>
Importo el modelo de Tarea : **const Tarea = require('./tarea');** . <br>
Quiero almacenar la tarea en el listado. <br>
Y como lo manejo como un objeto, solo le agrego una propiedad. **this._listado[tarea.id] = tarea;** <br>
```
const Tarea = require('./tarea');

class Tareas {

  _listado = {};

  constructor() {
    this._listado = {};
  }

  crearTarea(desc = '') {

    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

}

module.exports = Tareas;
```
Para listar las tareas voy a usar un swich porque tengo opciones controladas. <br>
Abro el archivo inquirer y me creo una nueva función llamada **leerInput** que va a ser igual a una arrow function que va a ser asíncrona para poder usar el await. <br>
Desntro creo la constante **question** que va a ser un objeto con las key: type, name, mensaje (como el mensaje va a ser algo que puede ir cambiando por parámetro mi función va a recibir un mensaje que lo nombro **mesage** y al ser igual que mi key-value solo lo nombro una vez). <br>
Y puedo forzar a la persona a que escriba un valor, por lo que uso el **validate** para validar que si su longitud es cero, como el usuario no me ingresó ningún valor, le mando el mensaje de que ingrese valor. Y si pasa la validación me retorna true.<br>
Para usar mi constante **question** me creo uan constante que tenga el await del inquirer.prompt con nuestra pregunta. <br>
Hay que recordar que el inquirer regresa un objeto pero me interesa la descripción, que la desestructuro y la retorno. <br>
Tengo que exportar la función leerInput. <br>
```
const leerInput = async(message) => {

  const question = {
    type: 'input',
    name: 'desc',
    message,
    validate( value) {
      if(value.length === 0) {
        return 'Por favor ingrese un valor';
      }
      return true;
    }
  };

  const { desc } = await inquirer.prompt(question);
  return desc;

}

module.exports = {
  inquirerMenu,
  pausa,
  leerInput
}
```
Volvemos a app.js. <br>
Y usamos la función leerInput. Para ello la importo y lo acomodo como listado, porque luego voy a tener más importaciones, así se ve claro. <br>
```
const { inquirerMenu, 
        pausa,
        leerInput 
} = require('./helpers/inquirer');
```
Y lo utlizo en el caso 1 dentrop de mi do while. <br>
```
 do {
       opt = await inquirerMenu();
       switch (opt) {
           case '1':
                const desc = await leerInput('Descripción: ');
                console.log(desc);    
            break;
            case '2':
                console.log(tareas._listado);
            break;   
       }
        await pausa();
    } while (opt !=='0');
```
Y ahora corro mi programa, si elijo la opción 1: <br>
```
===========================
    Seleccione una opción
===========================

? ¿Qué desea hacer? 1. Crear tarea 
? Descripción: 
```
Completo la descripción. Enter y listo.<br>
Si vuelvo a elegir la tarea 1, y solo pongo enter si descripción, voy a ver la validación, que se a ejecutar hasta que ingrese un valor. <br> 

Ahora ¿ cómo listo mis tareas ? <br>
Yo todavía no llamo a crearTarea.<br>
Como ya veo que tengo la descripción, saco el console.log.<br>
Entonces:
```
 switch (opt) {
           case '1':
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);  
            break;
```
Pruebo ahora creando dos tareas (con la opción 1) y  listo las tareas (con la opción 2), las veo. Pero si cierro mi aplicación, la vuelvo a abrir y quiero ver las tareas, las perdí. Lo que si las tengo es en memoria. <br>
Proximamente arreglamos esto para hacerlas persistentes. <br>

---

## Transformar un objeto a un arreglo

Primero hago algunos cambios estéticos en mi menú. Voy a **inquirer.js** y cambio a blanco el texto de Seleccione una opción. <br>
Y le acambio a los números de las opciones, para que tengan en color verde. En inquerir.js voy a la parte de choices y en cada número: **` ${ '6.'.green}** y cambio la opción a template literal.<br>
A la hora de listar las tareas no quiero que sea un objeto, ya que si la listo aparece con tods los atributos. <br>
Voya arareas y lo quiero transformar a un array , pero que solo sea un getter. En **get** es como si tuviera una **propiedad** en mi **clase**. <br>
Entonces en mi clase Tareas creo el get que es la función listadoArr y dentro tengo la constante listado que es un array. Y con **Object.keys(this._listado)** tengo un array de todas las keys (llaves) de mi objeto. Y uso el método **.forEach()** que va a tener las key y mando por consola al objeto. <br>
Uso un getter para rellenar un nuevo array. <br>
Con **Object.keys(this._listado)** para hacer un arreglo con todas las llaves <br>
Con el **.forEach** barro cada uno, la extraigo, la agrego al listado con **listado.push( tarea );**. <br>

```
 get listadoArr() {  

    const listado = [];
    Object.keys(this._listado).forEach( key => { 
      const tarea = this._listado[key];
      listado.push( tarea );
    });
    
    return listado;
  } 

```
Y en mi app.js en el case 2 voy a imprimirla: <br>
```
 case '2':
    console.log(tareas.listadoArr);
    break; 
```

---

## Guardar tareas en un archivo de texto

Me voy a crear un nuevo directorio al que voy a llamar **db**, pero o es ealmente una base de datos, va a ser el archivo .txt donde guardamos la información.<br>
Y en el directorio **helpers** creo un nuevo archivo llamado: **guardarArchivo.js**, donde voy a tener todas las interacciones para grabar y leer ese archivo. <br>
```
const fs = require('fs');

const guardarDB = ( data ) => { 
  const archivo = './db//data.txt';
  fs.writeFileSync(archivo, data);

}

module.exports = {
  guardarDB
}
```
Voy a recibir la **data**. Me creo una constante para la ruta donde voy a guardar el archivo. Y finalmente lo exporto. <br>
Volvemos a app.js y usamos la función **guardarDB();**, la coloco luego de mi switch. <br>
Y veo que arriba se haya exportado: **const { guardarDB } = require('./helpers/guardarArchivo');**.<br>
Pero **guardarDB** necesita la información de lo que voy a mandar a guardar. <br>
Entonces tengo: **guardarDB( tareas.listadoArr);**. <br>
La **data** que viene como un array debo transformarla a un **string**, por lo que uso **JSON.stringify()**.<br>
En guardarArchivo.js: <br>
```
const fs = require('fs');

const guardarDB = ( data ) => {  //voy a recibir la data
  const archivo = './db/data.txt';
  fs.writeFileSync(archivo, JSON.stringify(data));  //transformo el array data en string con JSON.stringify

}

module.exports = {
  guardarDB
}
```
Si creo una tarea, y la guardo, y luego voy al directorio **db** voy a ver el archivo creado, con un arreglo que dentro tiene mi objeto con su id. <br>
Pero el **JSON.stringify** crea un archivo JSON, entonces en mi constante archivo que tengo la ruta donde se guarda voy a cambiar **.txt** por **.json**.<br>
Voy a crear una nueva tarea, y en el directorio **db** ahora tengo un archivo **.json**, el cual es mucho más fácil de leer, entonces podemos ahora manejar la data como un .json.<br>
Pero todavía si se cierra la aplicación y se vuelve a ejecutar, no se van a guardar todavía las tareas. <br>
Entonces en app.js voy a comentar: **guardarDB( tareas.listadoArr);**.<br>

---

## Leer la base de datos

En **guardarArchivo.js**: <br>
```
const fs = require('fs');

const archivo = './db/data.json';

const guardarDB = ( data ) => {  //voy a recibir la data
  fs.writeFileSync(archivo, JSON.stringify(data));  //transformo el array data en string con JSON.stringify
}

const leerBD = () => {
  if ( !fs.existsSync(archivo) ) {
    return null;
  }
  const info = fs.readFileSync( archivo, {encoding:'utf-8'} );
  console.log(info);

  return null;
}

module.exports = {
  guardarDB,
  leerDB
}
```
En **app.js** vamos a exportar la función: **const { guardarDB, leerDB } = require('./helpers/guardarArchivo');**. <br>
Y creo una constante: **const tareasDB = leerDB();**.<br>
Entonces, en **guardarArchivo.js** : <br>

```
const leerDB = () => {
  if ( !fs.existsSync(archivo) ) {
    return null;
  }
  const info = fs.readFileSync( archivo, { encoding: 'utf-8' } );  //encoding para que no me regrese los bytes
  console.log(info);

  return null;
}

module.exports = {
  guardarDB,
  leerDB
}

```

Y en mi **app.js** utilizo el await para pausar la aplicación **await pausa();**: <br>

```
const { guardarDB, leerDB} = require('./helpers/guardarArchivo');


const tareasDB = leerDB();

    if ( tareasDB ) {  //si las tareas existen hay que establecerlas

    }

    await pausa();
```
Pero lo que se ve es un **string** no es un array con los objetos. <br>
Entonces para que regrese el array hay que parsearlo (lo opuesto la stringlify).<br>

En **guardarArchivo.js**: <br>
```
const leerDB = () => {
  if ( !fs.existsSync(archivo) ) {
    return null;
  }
  const info = fs.readFileSync( archivo, { encoding: 'utf-8' } );  //encoding para que no me regrese los bytes
  const data = JSON.parse( info);
  console.log(data);

  return null;
}

```
Ahora si tengo un objeto, porque los string está entre comillas sencillas. <br>
Estas no son instancias de mi clase tarea. <br>
Si en mi constante **leerDB** ahora el return de **data**, tengo un **arreglo de tareas**. Tengo que tomar este arreglo de tareas y crear el listado con la key del id que apunte  ala tarea. <br>


---

## Tarea * Cargar tarea

Luego dle constrautor me voy a crear un método llamado **cargarTareasFromArray** que va a recibir las tareas. Y esta función debe permitir que con estas tareas se cargue el arreglo. <br>
No son instancias de una clase, son un objeto literal de JS. <br>
Y hay que asegurarse que al hacer el proceso y listemos las tareas, se vean en formato de array. <br>

En **tareas.js** : <br>

```
 cargarTareasFromArray ( tareas = [] ) {
    tareas.forEach( tarea => {
      this._listado[tareas.id] = tarea;
    })
  }

```

En **app.js** : <br>

```
if ( tareasDB ) {  //cargar tareas
        tareas.cargarTareasFromArray( tareasBD );
    }

```
Y saco **await pausa();**, ya que no necesito esta pausa. <br>



---

## Listar tareas

Con la opción **2** del menú listamos las tareas. <br>
Por el momento solo se lista la tarea, mostrando toda la información, peor a las personas no les interesa saber si el listado está en null. <br>

En **tareas.js** voy a crear una nueva función llamada **listadoCompleto**, donde listo las tareas enumerandolas, con su descripcion e indico si está completada o si está pendiente (si está completada debe estar en verde y si está pendiente en rojo).<br>

En **tareas.js**:

```
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

```

---

## Tareas completadas y pendientes

Ahora hay que hacer que se puedan listar tareas pnedientes y completadas. En mi **tareas.js** me voy a crear una nueva función llamada **listarPendientesCompletadas** que recibe un argumento  (completadas ) por defecto en true, entonces si están completadas se ve el listado. Si es alse deben aparecer las demás, las pendientes.<br>
Entonces ahora las opciones **3** y **4** del menú van a funcionar. <br>

En app.js dentro del switch tengo que tener los casos para el menú y las opciones 3 y 4 : <br>

```
case '3':  //listar completadas
                tareas.listarPendientesCompletadas(true);
            break;   
            case '4':  //listar pendientes
                tareas.listarPendientesCompletadas(false);
            break; 

```

Y en **tareas.js** : <br>

```

listarPendientesCompletadas( completadas = true ) {

    console.log();
    let contador = 0;
    this.listadoArr.forEach( (tarea) => {  //el segudo argumento es el indice

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
        if( !completadas ) {
          contador +=1;
          console.log(`${ (contador + '.').red } ${ desc } :: ${ estado }`);
        }
      }

    });
  }

```
Y en el caso en que esté completada, en vez de ver el estado, voy a querer er la fecha en que se completó. <br>

---

## Listado para borrar

Aora quiero la opción de borrar la tarea, al seleciconar la opción me aparece el listado y ahi elijo cual quiero borrar, confirmo que lo quiero borrar y la borro. <br>

En la parte de **tareas.js** debo borrar una propiedad de listado, del objeto literal, dentro de mi clase tarea:

```
_listado = {
    'abc': 123
  };

```

Y me creo un método, debajo dle constructor llamado **borrarTarea** que recibe un id que es un string y pregunto si existe. <br>

```
 borrarTarea( id=''){
    if( this._listado[id] ) {
      delete this._listado[id];
    }
  }
```

Voy al archivo **inquirer.js** donde debo crear unas preguntas donde las opciones son mis opciones listadas del menu. <br>
Me creo un nuevo método llamado **listadoTareasBorrar** que es un arrow function que recibe como parámetro a las tareas (que son un array vacío) y es asíncrona para poder luego utilizar el await. Dentro voy a tener el value que va a ser el id de la tarea con el name que va a ser la descripción de la tarea. <br>
Debo exportar la función para poder utilizarla. <br>
Y en app.js la importo y en el switch agrego la opción 6 del menú. <br>


---

## Confirmar y borrar tarea


En **inquirer.js** creo la constante confirmar, la exporto y la importo en app.js : <br> 
```
const confirmar = async(message) => {

  const question = [
      {
          type: 'confirm',
          name: 'ok',
          message
      }
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
}   
```

Y en el switch, en mi caso 6: <br>
```
case '6':  //borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if ( id !== '0' ) {
                    const ok = await confirmar('¿Está seguro?');
                    if ( ok ) {
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    }
                }
            break; 
```
Si puse para borrar tareas, peor me equivoque y no quiero borrar, tengo que poder cancelar la opción, entonces en inquirer.js en mi **listadoTareasBorrar** agrego:

```
 choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancelar'
  });
```

---

## Completar las tareas

Puedo seleccionar más de una tarea para poder pasarlas a todas como completadas.<br>

En **inquirer.js** voy a listar las tareas.<br>
Creo la constante **mostrarListadoCheckList**, lo importo y exporto. <br>

```
const mostrarListadoCheckList = async( tareas = [] ) => {

  const choices = tareas.map( (tarea, i)  => {

    const idx = `${i+1}.`.green;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: true
    }
  });

  const pregunta = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selecciones',
      choices
    }
  ]

  const { ids } = await inquirer.prompt(pregunta);
  return ids;
}

```
Y en mi app.js completo la opción 5:<br>

```
case '5': // completado | pendiente
                const ids = await mostrarListadoCheckList( tareas.listadoArr);
                console.log(ids);
            break;   
```

---

## Marcar como completadas o pendientes las tareas

En **tareas.js** : <br>

```
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
```

Y en mi app.js en el caso 5 : <br>

```
 case '5': // completado | pendiente
                const ids = await mostrarListadoCheckList( tareas.listadoArr);
                tareas.toggleCompletadas( ids );
            break; 
```  



# Práctica 9: Aplicación de registro de Funko Pops

En esta práctica se pedía implementar una aplicación cuya funcionalidad fuera manejar los registros de Funkos de usuarios mediante el uso de ficheros JSON. Permitir al usuario, mediante la paso de parámetros por terminal, añadir, eliminar, modificar o mostrar sus Funkos.

Para esto he decidido desarrollar 2 clases principales, una clase Funko que representará la información necesaria del mismo y otra clase Usuario, que tendrá el nombre del usuario y su lista de funkos.

Para el desarrollo de la práctica entonces si hará uso de 3 nuevos conceptos, los paquetes **yargs** y **chalk** y también la **API síncrona** proporcionada por Node.js para trabajar con el sistema de ficheros

## _Clase Funko_

Esta clase será la que represente un funko, sus atributos serán los siguientes:

```ts
  private _id: number;
  private _nombre: string;
  private _descripcion: string;
  private _tipo: TipoFunko;
  private _genero: GeneroFunko;
  private _franquicia: string;
  private _numeroFranquicia: number;
  private _esExclusivo: boolean;
  private _características: string;
  private _valorMercado: number;
```

En el constructor se comprobará, por un lado que el nombre no sea vacío

```ts
if (nombre === "") {
  throw new Error("nombre inválido");
}
```

y también se comprobará que el valor de mercado sea positivo

```ts
if (valorMercado <= 0) {
  throw new Error("valor de mercado inválido");
}
```

En cuanto a métodos de la clase, solamente tendrá los getters para cada atributos del funko y también un método print que servirá para mostrar la información del funko por pantalla.

Los atributos **\_tipo** y **\_genero** son dos enumerados que también se han definido para esta práctica y corresponden con el siguiente código.

Correspondiente al **Tipo del Funko**

```ts
export enum TipoFunko {
  POP = "Pop",
  POP_RIDES = "Pop Rides",
  VYNIL_SODA = "Vynil Soda",
  VYNIL_GOLD = "Vynil Gold",
}
```

Correspondiente al **Género del Funko**

```ts
export enum GeneroFunko {
  ANIMACION = "Animacion",
  PELICULAS_TV = "Peliculas y TV",
  VIDEOJUEGOS = "Videojuegos",
  DEPORTES = "Deportes",
  MUSICA = "Musica",
  ANIME = "Anime",
}
```

Otra cosa a destacar sobre esta clase corresponde con el método print, en el que se emplea el **chalk** para mostrar por pantalla el color de del valor del mercado dependiendo del mismo.
Se hará de la siguiente manera.

```ts
if (this.valorMercado >= 65) {
  infoFunko += `Valor: ${chalk.red(this.valorMercado)} (Caro)`;
} else if (this.valorMercado >= 45) {
  infoFunko += `Valor: ${chalk.yellow(this.valorMercado)} (Precio elevado)`;
} else if (this.valorMercado >= 25) {
  infoFunko += `Valor: ${chalk.blue(this.valorMercado)} (Media de precio)`;
} else if (this.valorMercado <= 24) {
  infoFunko += `Valor: ${chalk.green(this.valorMercado)} (Barato)`;
}
```

Como se observa, los funkos Caros (más de 65 €) se mostrará de color rojo, los funkos de Precio Elevado (entre 65 y 45 €) se mostrará de color amarillo, los funkos con un precio medio (entre 45 y 25 €) se mostrará de color azul y por ultimo, los funkos baratos (menos de 24€) se mostrarán de color verde.

## _Clase Usuario_

Esta clase será la que se encargue de representar a un Usuario, con su nombre y su lista de Funkos además se podrá:

- Añadir funkos.
- Eliminar funkos.
- Modificar funkos.
- Listar todos los funkos.
- Mostrar un solo funko.

### Constructor de la clase

Para crear un usuario, lo primero que se hará es comprobar si existe una carpeta en la que se pueda alojar la información relativa a dicho usuario, en caso que no exista dicha carpeta, se creará con el nombre que se le haya indicado por el parámetro del constructor, además, se inicializa la lista de Funkos como vacía.
A continuación, en caso que exista la carpeta del usuario, se comprueba si tiene o no **Funkos**, si no tiene se indica mediante un mensaje y si tiene, obtendrá esta información con un parse y se introducirán en el array de funkos del usuario. Se hará de la siguiente manera:

```ts
      if (usuariosConFichero.length === 0) {
        console.log(chalk.red("Usuario sin funkos"));
      } else {
        usuariosConFichero.forEach((ficheroDelUsuario) => {
          const funkoJSON = JSON.parse(
            fs
              .readFileSync(
                "./src/FunkoApp/Usuarios/" + nombre + "/" + ficheroDelUsuario
              )
              .toString()
          );
          this.misFunkos.push(
            new Funko(
              funkoJSON.id,
              funkoJSON.nombre,
              funkoJSON.descripcion,
              funkoJSON.tipo,
              funkoJSON.genero,
              funkoJSON.franquicia,
              funkoJSON.numeroFranquicia,
              funkoJSON.esExclusivo,
              funkoJSON.características,
              funkoJSON.valorMercado
            )
          );
        });
```

Como se observa, mediante la lectura del fichero correspondiente a la ruta indicada, se obtiene la información necesaria del funko.
Con esto ya tendríamos en el usuario su lista de Funkos.

### Función addFunko

Con esta función podremos añadir a la lista de Funkos del usuario aquel Funko que se pase por parámetro.
Lo primero que se hará es comprobar si existe ya el funko en la lista del usuario, para esto se comparan los ID's y si existe se mostrará el mensaje **"Ya existe un funko con un ID igual en la lista de funkos"** y se cancela la operación. Por lado, si no existe el funko se añadirá a la lista con un push (**this.misFunkos.push(funkoNuevo)**) y se creará un fichero correspondiente de esta manera.

```ts
fs.writeFileSync(
  "./src/FunkoApp/Usuarios/" +
    this.nombre +
    "/" +
    "funko" +
    funkoNuevo.id +
    ".json",
  datosFunko
);
```

### Función deleteFunko

Con esta función se podrá eliminar de la lista de funkos de usuarios aquel que corresponda con el id que se pasa por parámetro. Habrá tres casos diferentes:

1. La lista está vacía y se indica mediante un mensaje.

2. La lista no está vacía pero el funko con ID que se intenta eliminar no está en la lista, también se indica por mensaje.

3. La lista tiene Funkos y el que se intenta eliminar sí existe, se eliminará entonces.

En este último caso, se hará con el siguiente código:

```ts
const indice = this.misFunkos.findIndex((funko) => funko.id === funkoID);
this.misFunkos.splice(indice, 1);
fs.rmSync(
  "./src/FunkoApp/Usuarios/" + this.nombre + "/" + "funko" + funkoID + ".json"
);
```

Primero se elimina el funko en sí de de la lista del usuario y luego se eliminará el fichero .JSON correspondiente a dicho funko.

### Función modifyFunko

En este caso se le pasará a la función aquel Funko que se quiere eliminar y de nuevo tenemos 3 casos:

1. La lista está vacía y se indica mediante un mensaje.

2. La lista no está vacía pero el funko con ID que se intenta modificar no está en la lista, también se indica por mensaje.

3. La lista tiene Funkos y el que se intenta modificar sí existe, se eliminará entonces.

Esta última caso se afronta de la siguiente manera:

```ts
const datosFunko = JSON.stringify(funkoModif);
fs.writeFileSync(
  "./src/FunkoApp/Usuarios/" +
    this.nombre +
    "/" +
    "funko" +
    funkoModif.id +
    ".json",
  datosFunko
);
```

Se reescribe en el fichero correspondiente la nueva información del Funko existente.

### Función listaDeFunkos

Con esta función se podrán mostrar por pantalla todos los funkos que están en la lista del usuario. En caso que el usuario tenga 0 funkos se indicará con un mensaje correspondiente. Por otro lado, para mostrar los funkos se hará haciendo uso de la función _print_ correspondiente a la clase **Funko**.

```ts
  listaDeFunkos(): void {
    if (this.misFunkos.length === 0) {
      console.log(
        chalk.red("Usuario con 0 Funkos, añada alguno con la opción add")
      );
    } else {
      this.misFunkos.forEach((funko) => {
        funko.print();
      });
    }
  }
```

Como se observa será necesario realizar ninguna modificación en los ficheros JSON.

### Función printFunko

Servirá para mostrar por pantalla aquel funko que se indique por parámetros.

```ts
  printFunko(funkoID: number) {
    const indice = this.misFunkos.findIndex((funko) => funko.id === funkoID);
    if (indice === -1) {
      return chalk.red(
        `El funko con id ${funkoID} no está en la lista del usuario`
      );
    }
    this.misFunkos[indice].print();
  }
```

Se obtendrá el índice correspondiente al ID que se recibe por parámetro y se imprimirá. En caso que no esté en la lista se indicará también por mensaje.

## YargsMain

Este fichero tendrán las funciones necesarias y correspondientes con el main del programa que será el responsable de tener aquellas funcionalidades que podrá usar el usuario por comandos.

Los comandos serán:

- **Add**: que solicitará al usuario los parámetros del funko que quiere añadir a la lista, una vez introduzca los datos se llamará a la función correspondiente con añadir un funko.

```ts
const usuario = new Usuario(argv.usuario);
const funko = new Funko(
  argv.id,
  argv.nombre,
  argv.descripc,
  argv.tipo as TipoFunko,
  argv.genero as GeneroFunko,
  argv.franquicia,
  argv.numFranquicia,
  argv.exclusivo,
  argv.caracteristicas,
  argv.valorMercado
);
console.log(usuario.addFunko(funko));
```

Se obtiene el usuario con su nombre que introduce por consola, se crea el funko con los datos de la terminal y se llama a la función addFunko.

- **Modify**: que solicitará al usuario los parámetros del funko que quiere modificar, una vez introduzca los datos se llamará a la función correspondiente con modificar un funko.

```ts
const funko = new Funko(
  argv.id,
  argv.nombre,
  argv.descripc,
  argv.tipo as TipoFunko,
  argv.genero as GeneroFunko,
  argv.franquicia,
  argv.numFranquicia,
  argv.exclusivo,
  argv.caracteristicas,
  argv.valorMercado
);
const usuario = new Usuario(argv.usuario);
console.log(usuario.modifyFunko(funko));
```

Se obtiene el usuario con su nombre que introduce por consola, se crea el funko con los datos de la terminal y se llama a la función modifyFunko.

- **Delete**: que solicitará al usuario el ID del funko que quiere eliminar, una vez introduzca los datos se llamará a la función correspondiente con eliminar un funko.

```ts
const usuario = new Usuario(argv.usuario);
console.log(usuario.deleteFunko(argv.id));
```

Se obtiene el usuario con su nombre que introduce por consola y se llama a la función deleteFunko con el id que introdujo.

- **Listar o mostrar un único Funko**: en este último caso tendremos dos opciones más de comandos para el usuario y estas llamarán a las funciones correspondientes **usuario.listaDeFunkos()** y **usuario.printFunko(argv.id)**

Con esto se acaban los comandos que podrá usar el usuario.

## **Conclusión**

Finalmente con esto estaría el programa terminado y estarían definidas las clases necesarias para representar los objetos que usarán y además estarán definidos los comandos que podrá usar el usuario. De esta práctica se puede destacar que es la primera en la que se hace uso de node.js, en este caso la API síncorna y considero que es una herramienta bastante útil para trabajar con ficheros JSON y poder manejar de una mejor forma la información de los mismos. Además, las otras herramientas **yargs** y **chalk** tienen buenas funcionalidades para trabajar con la terminar, tanto para mostrar información con diferentes colores y resaltar ciertos avisos como para pedir valores por consola y definir comandos para usar por terminal.

###### Lucas Pérez Rosario, 05/05/2023, DSI

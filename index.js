
const fs = require('fs'); //Agregamos el modulo fs


//Creamos nuestras constantes de entrada y salida
const imagenEntrada = `image.bmp`;
const imagen_bin = `imagen_bin.bmp`;
const imagen_bn = `imagen_bn.bmp`;
const imagen_sep = `imagen_sep.bmp`;




function read_image(imagenEntrada){

//Creamos una arreglo de tipo buffer para obtener los valores, usamos la función leer archivo, le pasamos como parametro la imagen en formato bmp
  const imagenBuffer = fs.readFileSync(imagenEntrada);

//Extraemos los valores de alto, ancho, bits y el inicio de los pixeles
  const alto = imagenBuffer.readInt32LE(22);
  const ancho = imagenBuffer.readInt32LE(18);
  const bits = imagenBuffer.readInt16LE(28);
  const inicio = imagenBuffer.readInt32LE(10);

// Imprimimos en consola los valores
  console.log('Alto:', alto);
  console.log('Ancho:', ancho);
  console.log('Bits:', bits);
  console.log('Inicio de píxeles:', inicio);

  return {imagenBuffer,inicio};

}


//Función para dividir los canales

function DividirCanales(imagenBuffer,inicio){
//Se crean los 3 arreglos para almacenar los pixeles azul, rojo y verde

  const pix_azules = [];
  const pix_rojos = [];
  const pix_verdes = [];


//Extraemos los pixeles del bufer y los asignamos a cada arreglo

  for (let i = inicio; i < imagenBuffer.length; i += 3) {
    pix_azules.push(imagenBuffer[i]);
    pix_rojos.push(imagenBuffer[i + 1]);
    pix_verdes.push(imagenBuffer[i + 2]);
  }


//Imprimos en consola los pixeles de cada arreglo

  console.log('Pixeles azules:', pix_azules);
  console.log('Pixeles verdes:', pix_verdes);
  console.log('Pixeles rojos:', pix_rojos);

  return {pix_azules, pix_verdes, pix_rojos};

}




//Declaramos el umbral
const umbralBin = 240


//Función para convertir a binario

function convertir_Binario(pix_rojos, pix_verdes, pix_azules, umbralBin) {
  //Iteramos sobre cada píxel
  for (let i = 0; i < pix_rojos.length; i++) {
    //Calculamos la suma de los canales de color
    const suma = pix_rojos[i] + pix_verdes[i] + pix_azules[i];

    //Si la suma es menor que el umbral sustituimos por 0
    if (suma < umbralBin) {
      imagenBuffer[inicio + i * 3] = 0;   //Azul
      imagenBuffer[inicio + i * 3 + 1] = 0; //Rojo
      imagenBuffer[inicio + i * 3 + 2] = 0; //Verde
    } else {
      //Si la suma es mayor o igual que el umbral sustituimos por 255
      imagenBuffer[inicio + i * 3] = 255;   //Azul
      imagenBuffer[inicio + i * 3 + 1] = 255; //Rojo
      imagenBuffer[inicio + i * 3 + 2] = 255; //Verde
    }
  }
  return imagenBuffer; //Retornamos el buffer modificado
}

//Funcion convertir BN

function convertir_BN(pix_rojos, pix_verdes, pix_azules) {
  // Iteramos sobre cada píxel
  for (let i = 0; i < pix_rojos.length; i++) {
    // Calculamos el promedio de los canales de color
    const promedio = (pix_rojos[i] + pix_verdes[i] + pix_azules[i]) / 3 | 0; //Usamos | 0 para redondear a entero

    // Establecemos el promedio en todos los canales
    imagenBuffer[inicio + i * 3] = promedio;   //Azul
    imagenBuffer[inicio + i * 3 + 1] = promedio; //Rojo
    imagenBuffer[inicio + i * 3 + 2] = promedio; //Verde
  }
  return imagenBuffer; //Retornamos el buffer modificado
}

//Funcion convertir sepia

function convertir_SEPIA(pix_azules, pix_verdes, pix_rojos) {
  for (let i = 0; i < pix_rojos.length; i++) {
    const rojo = pix_rojos[i];
    const verde = pix_verdes[i];
    const azul = pix_azules[i];

    let nuevoRojo = (0.393 * rojo) + (0.769 * verde) + (0.189 * azul);
    let nuevoVerde = (0.349 * rojo) + (0.686 * verde) + (0.168 * azul);
    let nuevoAzul = (0.272 * rojo) + (0.534 * verde) + (0.131 * azul);

    // Verificamos si el resultado de cada operación supera 255, si es así lo sustituimos por 255
    if (nuevoRojo > 255) {
      nuevoRojo = 255;
    }
    if (nuevoVerde > 255) {
      nuevoVerde = 255;
    }
    if (nuevoAzul > 255) {
      nuevoAzul = 255;
    }

    //Se modifica el buffer y damos los nuevos valores a los canales
    imagenBuffer[inicio + i * 3] = nuevoAzul;   //Azul
    imagenBuffer[inicio + i * 3 + 1] = nuevoRojo; //Rojo
    imagenBuffer[inicio + i * 3 + 2] = nuevoVerde; //Verde
  }
  return imagenBuffer; //Retornamos el buffer modificado
}




//Función para guardar la imagen
function GuardarImagen(nombreImage, imagenBuffer) {
  fs.writeFileSync(nombreImage, imagenBuffer);
}


// Uso de funciones
const { imagenBuffer, inicio } = read_image(imagenEntrada);

// Dividimos los canales antes de realizar las conversiones
const { pix_azules, pix_verdes, pix_rojos } = DividirCanales(imagenBuffer, inicio);

// Convertimos y guardamos las imágenes
const imagenBinaria = convertir_Binario(pix_rojos, pix_verdes, pix_azules, umbralBin);
GuardarImagen(imagen_bin, imagenBinaria);

const imagenBN = convertir_BN(pix_rojos, pix_verdes, pix_azules);
GuardarImagen(imagen_bn, imagenBN);

const imagenSepia = convertir_SEPIA(pix_azules, pix_verdes, pix_rojos);
GuardarImagen(imagen_sep, imagenSepia);

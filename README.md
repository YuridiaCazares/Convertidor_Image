# Convertidor_Imagen

Práctica que convierte una imagen en formato BMP a binario, sepia y blanco/Negro.

Lenguaje: JavaScript 
Se utiliza el módulo fs de Node.js 

Requerimientos

• Leer una imagen en formato BMP utilizando el módulo fs y la función fs.readFileSync, no se debe utilizar algún módulo o función adicional.
• La imagen se convertirá a binaria, a blanco y negro y a tono sepia. Para dichas transformaciones, se guardan todos los píxeles de la imagen en un buffer y después se dividirán en 3 arreglos separados correspondientes a cada canal (rojo, verde y azul).
Después de cada procedimiento sobre los 3 arreglos, se regresarán los píxeles modificados al buffer, para crear las nuevas imágenes.
• El código tendrá por lo menos 3 funciones, una para leer la imagen, y una función para cada transformación. Es deseable crear una función extra para el código que se pueda repetir como la división de canales.
• Para generar las imágenes modificadas, se usará la función fs.writeFileSync. Cada imagen se guardará por separado en la carpeta base del proyecto. Las imágenes generadas se guardarán con los nombres: "imagen_bin.bmp", "imagen_bn.bmp", e, "imagen_sep.bmp".

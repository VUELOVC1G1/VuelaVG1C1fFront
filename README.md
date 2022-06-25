# VuelaVG1C1fFront


Este proyecto fue realizado con [Angular CLI](https://github.com/angular/angular-cli) version 13.3.7.

## Dependencias

El proyecto de FrontEnd una las siguentes dependincias.

1. Comando para depencencias node.
2. Angular Material, propio de Angular CLI para mejorar
   el estilo visual de los componentes.
3. PdfMake, esta dependencia generar pdf, se uso para la creación de boletos
4. techiediaries/ngx-qrcode, una libreria que facilita la generacion de códigos QR.
5. html2canvas, una libreria que trasforma algun componete html a una imagen.
6. highcharts, una libraria de graficas estaditica y facilita a los desarrolladores la creación de gráficos para plataformas web.
7. GHPages, librearia que facilita el despliegue de el proyecto local a la nube, en GitHub Pages. 

## Comandos para instalar dependencias

1. npm install.
2. ng add @angular/material.
3. npm install pdfmake.
4. npm install @techiediaries/ngx-qrcode
5. npm install --save html2canvas
6. npm install highcharts --save 
7. npm i angular-cli-ghpages


Nota: Al instalar Angular Material, seleccione en themes, "costum", y en animation "Si".  

## Despliegue

El proyecto se encuntra desplegado en GitHub Pages en la siguente
dirección `https://vuelovc1g1.github.io/VuelaVG1C1fFront/inicio/home`

## Servidor de desarrollo

Ejecute `ng serve` para un servidor de desarrollo. Navegue a `http://localhost:4200/`. La aplicación se recargará
automáticamente si cambia alguno de los archivos de origen.

## Andamiaje de código

Ejecute `ng generar componente nombre-componente` para generar un nuevo componente. También puede
usar `ng generar directiva|tubería|servicio|clase|guardia|interfaz|enum|módulo`.

## Construir

Ejecute `ng build` para compilar el proyecto. Los artefactos de compilación se almacenarán en el directorio `dist/`.

## Ejecutando pruebas unitarias

Ejecute `ng test` para ejecutar las pruebas unitarias a través de [Karma](https://karma-runner.github.io).

## Ejecutar pruebas de extremo a extremo

Ejecute `ng e2e` para ejecutar las pruebas de extremo a extremo a través de una plataforma de su elección. Para usar
este comando, primero debe agregar un paquete que implemente capacidades de prueba de un extremo a otro.

## Más ayuda

Para obtener más ayuda sobre Angular CLI, use `ng help` o consulte la
página [Descripción general y referencia de comandos de Angular CLI] (https://angular.io/cli).

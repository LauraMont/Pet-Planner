

//Ejemplo de for
//Usuario ingresa la suma de de los valores sucesivos del valor ingresado por el usuario
let valor =prompt("Ingrese valor base entero: ");
let sumaSucesiva = 0;
for(let i=1 ; i<=valor ; i++){
    sumaSucesiva += i;
}
alert("La suma sucesiva es: " + sumaSucesiva + "\nFin del Proceso");
//Menu que concatena las palabras 
//Presione 1 si quiere imprimir las palabras
//Presone 2 si quiere agregar mas palabras
//Otra tecla si quiere salir

let opcion = '1';
let texto;
let nuevo_texto;

while(opcion==='1'||opcion==='2'){
    opcion = prompt("Ingrese opcion deseada: \n1:Imprimir texto \n2:Agregar texto \nPara salir presione una tecla cualquiera");
    
    if(opcion==='1'){
        alert(texto);
    }else if (opcion === '2'){
        nuevo_texto = prompt("Ingrese texto");
        if(texto === undefined){
            texto = nuevo_texto;
        }
        else{
            texto+=" "+nuevo_texto;
        }
    }else{
        alert("Fin del proceso");
        break;
    }
}

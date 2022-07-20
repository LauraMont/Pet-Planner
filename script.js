/*
    Iniciar sesion primero
    Menu de vista rapida con 4 opciones
    1:Ver perfil medico de  mi mascota (Perfil consiste en peso , vacunas, bitacora de visitas al veterinario, nombre, raza, edad)
    2:Hacer una nota rapida (Por ahora solo se puede escribir solo 1,por lo tato se sobreescribe la anterior)
    3:Editar perfil medico 
    4.Ver mis notas rapidas   
    0:Salir
    Otro valor: vuelve a preguntar
*/
function Mostrar_perfil(nombre,raza,peso,vacunas,bitacora){
    alert("Perfil de " +nombre+ "\nraza: " +raza+ "\nedad: " +edad+ "años"+"\npeso:" +peso+ + "kg" + "\nvacunas: " +vacunas+ "\nbitacora: " +bitacora);
}

let opcion = '1';
let notaRapida = "Comprar comida para sasha";
//Variables de inicio de sesion
let usuario = "LauraMontano";
let password = "Laura1234";
//Variables de perfil medico
let nombre = "Sasha";
let edad = 5 ; 
let raza = "Mezcla";
let peso = 10;
let vacunas = "Antirabica";
let bitacora = "10/07/2022 :Visita al veterinario- se le dio a vacuna antirrabica\n"; 

for(let i = 5; i>0 ; i--){
    let user = prompt("Ingrese usuario: ");
    let psw = prompt("Ingrese contraseña: ");

    if((user === usuario) && (psw === password)){
        while(opcion !== '0'){
            opcion = prompt("Ingrese opcion deseada: \n1:Ver perfil medico de  mi mascota \n2:Hacer una nota rapida \n3:Editar perfil medico \n4:Ver mis notas rapidas \n0:Salir  ");
            switch(opcion){
                case('0'):console.log("Usuario cerro sesión");
                    break;
                case('1'):Mostrar_perfil(nombre,raza,peso,vacunas,bitacora);
                    break;
                case('2'):notaRapida = prompt("Ingrese nota rapida: ") ;
                    break;
                case('3'):let opcion = prompt("Ingrese una opcion: \n1:Editar nombre.\n2:Editar raza.\n3:Editar edad.\n4:Editar peso.\n5:Editar bitacora.\n6:Editar vacunas.");
                    switch(opcion){
                        case ('1'):nombre = prompt("Ingrese nombre: ");
                            break;
                        case ('2'):raza = prompt("Ingrese raza: ");
                            break;
                        case ('3'):edad = prompt("Ingrese nueva edad: ");
                            break;
                        case ('4'):peso = prompt("Ingrese nuevo peso: ");
                            break;
                        case ('5'):bitacora += " " + prompt("Ingrese nueva bitacora: ") + "\n";
                            break;
                        case ('6'):vacunas = prompt("Ingrese nuevas vacunas: ");
                            break;
                    }
                    break;
                case('4'):alert(notaRapida);
                    break;
                default: alert("Opcion Invalida.");
                    break;
            }
        }
        break;
    }else{
        alert("Usuario o contraseña invalidos, por favor intente de nuevo.Tiene "+(i-1)+ " intentos mas.");
    }
    
}


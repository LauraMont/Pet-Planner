/*
    Iniciar sesion primero
    Menu de vista rapida con 4 opciones
    1:Ver perfil medico de  mi mascota (Perfil consiste en peso , vacunas, bitacora de visitas al veterinario, nombre, raza, edad)
    2:Hacer una nota rapida (Por ahora solo se puede escribir solo 1,por lo tato se sobreescribe la anterior)
    3:Editar perfil medico 
    4.Ver mis notas rapidas   
    5:Agregar mascota
    0:Salir
    Otro valor: vuelve a preguntar
*/
/* Clases */
class Usuario{
    constructor(user ,psw){
        this.user = user;
        this.password = psw;
    }
    cambiarUsuario(){
        let nuevoUsuario = prompt("Ingrese nuevo usuario");
        this.usuario = nuevoUsuario;
    }
    cambiarPsw(){
        let nuevaPsw = prompt("Ingrese anterior contraseña");
        if(nuevaPsw = this.password){
            nuevaPsw = prompt("Ingrese nueva constraseña");
            this.password = nuevaPsw
        }else{
            alert("Contraseña invalida");
        }
    }
}
class Mascota{
    constructor(nombre, especie, edad, peso, raza, vacunas, bitacora){
        this.nombre = nombre;
        this.especie = especie;
        this.edad = edad;
        this.peso = peso;
        this.raza = "none";
        this.bitacora = [];
        this.vacunas = [];

        if(raza != undefined){
            this.raza = raza;
        }
        if(vacunas != undefined){
            this.vacunas.push(vacunas) ;
        }
        if(bitacora != undefined){
            this.bitacora.push(bitacora) ;
        }
    }
    CambiarNombre(){
        this.nombre = prompt("Ingrese nuevo nombre: ");
    }
    CambiarEspecie(){
        this.especie = prompt("Ingrese especie: ");
    }
    CambiarPeso(){
        this.peso = prompt("Ingrese peso: ");
    }
    CambiarEdad(){
        this.edad = prompt("Ingrese edad: ");
    }
    CambiarRaza(){
        this.raza = prompt("Ingrese raza: ");
    }
    AgregarBitacora(){
        this.bitacora.push(prompt("Ingrese nueva bitacora: "));
    }
    AgregarVacunas(){
        this.vacunas.push(prompt("Ingrese nueva vacuna: "));
    }

    MostrarPerfil(){
        alert("Perfil de " + this.nombre + "\nraza: " + this.raza + "\nedad: " + this.edad + "años" + "\npeso:" +this.peso + "kg" + "\nvacunas: " +this.vacunas.join('\n')+ "\nbitacora: " +this.bitacora.join('\n'));
    }
}
/* Fin de clases */
/* Funciones */
/* --- Instanciar objeto con una función ---Creditos a la tutora Daniela <3 */
function agregarMascota() {
    const nombre = prompt("Ingresa el nombre:");
    const especie = prompt("Ingresar especie:");
    const edad = prompt("Ingresar edad:");
    const peso = prompt("Ingresar peso: ");

    return new Mascota(nombre, especie, edad, peso);
}

function elegirMascota(Mascotas){
    let texto = " ";
    for(let index = 0 ; index <Mascotas.length ; index++){
        texto += (index+1) + ":" + Mascotas[index].nombre + "\n";
    }
    return parseInt(prompt("Ingrese el indice de la mascota deseada\n" + texto))-1;

}

function imprimirTexto(texto){
    if(texto.length>=1){
        alert(texto.join('\n'));
    }
    else{
        alert("No hay nada escrito en las notas rapidas.");
    }
}
/* Fin de Funciones */
/* Variables */
let opcion = '1';
let notaRapida = [];
let usuario = new Usuario ("LauraMontaño" , "Laura1234");
let mascotas = [new Mascota("Sasha", "especie", 5, 10)];2
/* Fin de Variables */
for(let i = 5; i>0 ; i--){
    let user = prompt("Ingrese usuario: ");
    let psw = prompt("Ingrese contraseña: ");

    if((user === usuario.user) && (psw === usuario.password)){
        while(opcion !== '0'){
            opcion = prompt("Ingrese opcion deseada: \n1:Ver perfil medico de mis mascotas \n2:Hacer una nota rapida \n3:Editar perfil medico \n4:Ver mis notas rapidas \n5:Agregar nueva mascota\n0:Salir  ");
            switch(opcion){
                case('0'):console.log("Usuario cerro sesión");
                    break;
                case('1'):
                    for (const key of mascotas) {
                        key.MostrarPerfil();
                    }
                    break;
                case('2'):let notaNueva = prompt("Ingrese nota rapida: ") ;
                    notaRapida.push(notaNueva);
                    break;
                case('3'):
                    let indice = elegirMascota(mascotas);
                    let _opcion = prompt("Ingrese una opcion: \n1:Editar nombre.\n2:Editar raza.\n3:Editar edad.\n4:Editar peso.\n5:Editar bitacora.\n6:Editar vacunas.");
                    switch(_opcion){
                        case ('1'):mascotas[indice].CambiarNombre();
                            break;
                        case ('2'):mascotas[indice].CambiarRaza();
                            break;
                        case ('3'):mascotas[indice].CambiarEdad(); 
                            break;
                        case ('4'):mascotas[indice].CambiarPeso(); 
                            break;
                        case ('5'):mascotas[indice].AgregarBitacora(); 
                            break;
                        case ('6'):mascotas[indice].AgregarVacunas();
                            break;
                    }
                    break;
                case('4'):imprimirTexto(notaRapida);
                    break;
                case('5'):mascotas.push(agregarMascota()) ;
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

/*
    En el proyecto se van a implementar las siguientes pesatañas:
    -Index : Se vera cards de nuestras mascotas con parte de su informacion (Imagen, nombre, edad, raza)
    -Mascotas : Se vera el perfil ccompleto de todas las mascotas , ademas se podra agregar una nueva mascota
    -Perfil: Informacion del usuario,, podra cambiar su nombre y contraseña
*/
/*    
    Iniciar sesion primero
    Menu de vista rapida con 4 opciones
    1:Ver perfil medico de  mi mascota (Perfil consiste en peso , vacunas, bitacora de visitas al veterinario, nombre, raza, edad)
    2:Hacer una nota rapida (Por ahora solo se puede escribir solo 1,por lo tato se sobreescribe la anterior)
    3:Editar perfil medico 
    4.Ver mis notas rapidas   
    5:Agregar mascota
    6.Editar datos del usuario
    0:Salir
    Otro valor: vuelve a preguntar
*/
/* Clases */
class Usuario{
    constructor(user ,psw){
        this.user = user;
        this.password = psw;
    }
    cambiarDatos(op){
        switch(op){
            case('1'):
                let nuevoUsuario = prompt("Ingrese nuevo usuario");
                this.usuario = nuevoUsuario;
                break;
            case('2'):
                let nuevaPsw = prompt("Ingrese anterior contraseña");
                if(nuevaPsw = this.password){
                    nuevaPsw = prompt("Ingrese nueva constraseña");
                    this.password = nuevaPsw
                }else{
                    alert("Contraseña invalida");
                }
                break;
            default:alert("Opcion invalida\n");
                break;
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
    CambiarDato(opcion){
        switch(opcion){
            case ('1'):this.nombre = prompt("Ingrese nuevo nombre: ");
                break;
            case ('2'):this.raza = prompt("Ingrese raza: ");
                break;
            case ('3'):this.edad = prompt("Ingrese edad: ");
                break;
            case ('4'):this.peso = prompt("Ingrese peso: ");
                break;
            case ('5'):this.bitacora.push(prompt("Ingrese nueva bitacora: "));
                break;
            case ('6'):this.vacunas.push(prompt("Ingrese nueva vacuna: "));
                break;
            case ('7'):this.especie = prompt("Ingrese especie: ");
                break;
            default: alert("Opcion invalida\n");
                break;
        }
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
    const raza = prompt("Ingresar raza (si es desconocida ingrese none):");
    const edad = prompt("Ingresar edad:");
    const peso = prompt("Ingresar peso: ");
    return new Mascota(nombre, especie, edad, peso, raza);
}

function elegirMascota(Mascotas){
    let texto = " ";
    let index = 0;
    Mascotas.forEach(element => {
        index++;
        texto += index + ":" + element.nombre + "\n";
    });
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

function agregarCardMascota(mascota){
        let contenedor = document.createElement("div");
        //Definimos el innerHTML del elemento con una plantilla de texto
        contenedor.innerHTML = `<img src="..." class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title nombre">${mascota.nombre}</h5>
                                    <p>
                                        Raza: ${mascota.raza}
                                        <br>Edad: ${mascota.edad}
                                        <br>Peso: ${mascota.peso}
                                    </p>
                                </div>`;
        contenedor.className = "card bg-petcard";
        document.getElementById("petCards").appendChild(contenedor);
}
//Copia la informacion en cada card correspondiente al orden alfabetico 
//y agrega una con el ultimo elemento que se ingreso
function asignarPetCards(mascotas){
    let nombre = document.querySelectorAll("#petCards .bg-petcard h5");
    let datos = document.querySelectorAll("#petCards .bg-petcard p");
    let i;
    for (i = 0 ; i < nombre.length; i++) {
        nombre[i].innerText = mascotas[i].nombre;
        datos[i].innerHTML = `<img src="..." class="card-img-top" alt="...">
                            Raza: ${mascotas[i].raza}
                            <br>Edad: ${mascotas[i].edad}
                            <br>Peso: ${mascotas[i].peso}`;
    }
    console.log(i);
    agregarCardMascota(mascotas[i]);
}
function agregarCardNota(nuevaNota){
    let contenedor = document.createElement("div");
    //Definimos el innerHTML del elemento con una plantilla de texto
    contenedor.innerHTML = `<img src="..." class="card-img-top" alt="...">
                            <div class="card-header">Nota 1</div>
                            <div class="card-body">
                                <p class="card-text">${nuevaNota}</p>
                            </div>`;
    contenedor.className = "card text-dark c2 mb-3";
    document.getElementById("NotasRapidas").appendChild(contenedor);
}
/* Fin de Funciones */
/* Variables */
let opcion = '1';
let notaRapida = [];
let usuario = new Usuario ("LauraMontaño" , "Laura1234");
let mascotas = [new Mascota("Sasha", "especie", 5, 10, "golden")];
/* Fin de Variables */
    let user = prompt("Ingrese usuario: ");
    let psw = prompt("Ingrese contraseña: ");

    if((user === usuario.user) && (psw === usuario.password)){
        //Cambiar titulo principal del index
        let titulo = document.getElementById("tituloPrincipal");
        titulo.innerText = "Bienvenido/a "+usuario.user;
        agregarCardMascota(mascotas[0]);
        while(opcion !== '0'){
            opcion = prompt("Ingrese opcion deseada: \n1:Hacer una nota rapida \n2:Editar perfil medico \n3:Agregar nueva mascota\n4:Editar Informacion del usuarion\n0:Salir  ");
            switch(opcion){
                case('0'):console.log("Usuario cerro sesión");
                    break;
                case('1'):let nuevaNota =prompt("Ingrese nota rapida: ");
                    notaRapida.push(nuevaNota);
                    agregarCardNota(nuevaNota);
                    break;
                case('2'):
                    let indice = elegirMascota(mascotas);
                    let _opcion = prompt("Ingrese una opcion: \n1:Editar nombre.\n2:Editar raza.\n3:Editar edad.\n4:Editar peso.\n5:Editar bitacora.\n6:Editar vacunas.\n7:Editar especie");
                    mascotas[indice].CambiarDato(_opcion);
                    break;
                case('3'):mascotas.push(agregarMascota()) ;
                    mascotas.sort((a, b) => {//Ordena por orden alfabetico la lista de mascotas
                        if (a.nombre.toUpperCase() > b.nombre.toUpperCase()) {
                            return 1;
                        }
                        if (a.nombre.toUpperCase() < b.nombre.toUpperCase()) {
                            return -1;
                        }
                        // a es igual a b
                        return 0;
                    })
                    asignarPetCards(mascotas);
                    break;
                case('4'):let op = prompt("Ingrese opcion: \n1:Cambiar nombre.\n2:Cambiar contraseña");
                    usuario.cambiarDatos(op);
                    break;
                default: alert("Opcion Invalida.");
                    break;
            }
        }
    }else{
        alert("Usuario o contraseña invalidos, por favor intente de nuevo.");
    }
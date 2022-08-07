
/*
    En el proyecto se van a implementar las siguientes pesatañas:
    -Index : Se vera cards de nuestras mascotas con parte de su informacion (Imagen, nombre, edad, raza)
    -Mascotas : Se vera el perfil ccompleto de todas las mascotas , ademas se podra agregar una nueva mascota
    -Perfil: Informacion del usuario,, podra cambiar su nombre y contraseña
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
    constructor(nombre, especie, edad, peso, raza,imagen,vacunas,bitacora ){
        this.nombre = nombre;
        this.especie = especie;
        this.edad = edad;
        this.peso = peso;
        this.raza = "none";
        this.bitacora = [];
        this.vacunas = [];
        this.imagen = imagen;

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
function agregarCardMascotaIndex(mascota){
    let contenedor = document.createElement("div");
    //Agregamos card al index
    contenedor.innerHTML = `<img src="${mascota.imagen}" class="card-img-top w-50" alt="...">
                            <div class="card-body">
                                <h5 class="card-title nombre">${mascota.nombre}</h5>
                                <p>
                                    Raza: ${mascota.raza}
                                    <br>Edad: ${mascota.edad}
                                    <br>Peso: ${mascota.peso}
                                </p>
                            </div>`;
    contenedor.className = "d-flex flex-column align-items-center card bg-petcard pt-3";
    document.getElementById("petCards").appendChild(contenedor);
}

function agregarCardMascotaMisMascotas(mascota){
    let contenedor = document.createElement("div");
    //Agregamos perfil a la pagina de mascotas
    contenedor.innerHTML = `<div class="card mb-3" >
    <div class="row g-0">
        <div class="col-md-4">
            <img src="${mascota.imagen}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${mascota.nombre}</h5>
                <p class="card-text">
                    Edad: ${mascota.edad}
                    <br>Especie: ${mascota.especie}
                    <br>Raza: ${mascota.raza}
                    <br>Bitacora: ${mascota.bitacora}
                    <br>Vacunas: ${mascota.vacunas}
                </p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>
    </div>
</div>`;
contenedor.className = "d-flex flex-column align-items-center card bg-petcard pt-3";
document.getElementById("listaMascotas").appendChild(contenedor);
}
//Copia la informacion en cada card correspondiente al orden alfabetico 
//y agrega una con el ultimo elemento que se ingreso
function asignarPetCardsIndex(mascotas){
    let nombre = document.querySelectorAll("#petCards .bg-petcard h5");
    let datos = document.querySelectorAll("#petCards .bg-petcard p");
    let i = 0;
    if(mascotas.length>1){
        for (i = 0 ; i < nombre.length; i++) {
        nombre[i].innerText = mascotas[i].nombre;
        datos[i].innerHTML = `Edad: ${mascota.edad}
                            <br>Especie: ${mascota.especie}
                            <br>Raza: ${mascota.raza}
                            <br>Bitacora: ${mascota.bitacora}
                            <br>Vacunas: ${mascota.vacunas}`;
        }
    }
    agregarCardMascotaIndex(mascotas[i]);
    guardarMascotas(mascotas);
}
//Copia la informacion en cada card correspondiente al orden alfabetico 
//y agrega una con el ultimo elemento que se ingreso
function asignarPetCardsMascotas(mascotas){
    let nombre = document.querySelectorAll("#petCards .bg-petcard h5");
    let datos = document.querySelectorAll("#petCards .bg-petcard p");
    let i = 0;
    if(mascotas.length>1){
        for (i = 0 ; i < nombre.length; i++) {
        nombre[i].innerText = mascotas[i].nombre;
        datos[i].innerHTML = `<img src="..." class="card-img-top" alt="...">
                            Raza: ${mascotas[i].raza}
                            <br>Edad: ${mascotas[i].edad}
                            <br>Peso: ${mascotas[i].peso}`;
        }
    }
    agregarCardMascotaMisMascotas(mascotas[i]);
    guardarMascotas(mascotas);
}
//Agrega una nota al final de la lista
function agregarCardNota(notas){
    notas.forEach(element => {
        let contenedor = document.createElement("div");
        //Definimos el innerHTML del elemento con una plantilla de texto
        contenedor.innerHTML = `<div class="card-header">Fecha: dd/mm/aa </div>
                                <div class="card-body">
                                    <p class="card-text">${element}</p>
                                </div>`;
        contenedor.className = "card text-dark c2 mb-3";
        document.getElementById("NotasRapidas").appendChild(contenedor);
    });
    
}
//Guardar datos en el storage 
function guardarDatosUsuario(usuario){
    localStorage.setItem('usuario', JSON.stringify(usuario));
}
function guardarMascotas(mascotas){
    localStorage.setItem('mascotas', JSON.stringify(mascotas));
}
function guardarNotasRapidas(notaRapida){
    localStorage.setItem('notaRapida', JSON.stringify(notaRapida));
}
//Oculta el login y hace visible el home del usuario
function IniciarSesion(mascotas, notas){
    home = document.querySelectorAll('.d-none');
    login = document.querySelectorAll('.d-view');

    home.forEach(element => {
        element.classList.replace('d-none','d-view');
    });
    login.forEach(element => {
        element.classList.replace('d-view','d-none');
    });
    asignarPetCardsIndex(mascotas);
    agregarCardNota(notas);
}

//Recupero los datos que se guardaron y los retorno
function recuperarUsuario() {
    let user = JSON.parse(localStorage.getItem('usuario'));
    return user;
}
/* Fin de Funciones */
/* Variables */
let usuario = new Usuario ("LauraMontaño" , "Laura1234");
let mascotas = [new Mascota("Sasha", "especie", 5, 10, "golden","./img/perro.png")];
let notaRapida = ["holaaa","byeee"];

localStorage.setItem('usuario',JSON.stringify(usuario));
localStorage.setItem('mascotas',JSON.stringify(mascotas));
localStorage.setItem('notaRapida',JSON.stringify(notaRapida));

const pets = JSON.parse(localStorage.getItem('mascotas')),
notes = JSON.parse(localStorage.getItem('notaRapida'));


const ingresarBtn = document.getElementById('ingresarBtn'), 
    misMascotasTab = document.getElementById('misMascotasTab'),
    user = document.getElementById('user'),
    psw = document.getElementById('Password');

/* Eventos */
ingresarBtn.addEventListener('click',()=>{
    let usuario = recuperarUsuario();
    if((user.value == usuario.user)&&(psw.value == usuario.password)){
        IniciarSesion(pets ,notes);
    }else{
        alert("Usuario y/o contraseña invalidos.");
    }
});
misMascotasTab.addEventListener('click',()=>{
    console.log("hola");
    asignarPetCardsMascotas(pets);
});

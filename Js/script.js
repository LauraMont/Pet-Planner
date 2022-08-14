
/*Index:
Inicio de sesion con solo un usuario 
Se podra visualizar card de las mascotas con poca informacion y las notas rapidas 
Se podran agregar las notas rapidas
Queda pendiete la eliminacion de un nota rapida
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
//Agrega una card mascota al final de la lista
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
//Copia la informacion en cada card correspondiente al orden alfabetico 
//y agrega una con el ultimo elemento que se ingreso
function asignarPetCardsIndex(mascotas){
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
    const lista = document.getElementById("petCards");
    lista.innerHTML = ' ';
    mascotas.forEach(element => {
        agregarCardMascotaIndex(element);
    });
    guardarMascotas(mascotas);
}
//Agrega toda las cards de notas 
function agregarCardNota(notas, nota){
    let listaNotas = document.getElementById('NotasRapidas');
    if(nota!= undefined){
        notas.push(nota); //Si hay una nota rapida , debe agregarse a las notas 
    }
    listaNotas.innerHTML = ' ';
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
    guardarNotasRapidas(notas)
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
function IniciarSesion(mascotas, notas, nombre){
    const titulo = document.getElementById('tituloPrincipal'),
    home = document.querySelectorAll('.d-none'),
    login = document.querySelectorAll('.d-view');

    titulo.innerText = "Bienvenido/a "+ nombre;
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
    user & localStorage.setItem('usuario',JSON.stringify(usuario));
    return user;
}
/* Fin de Funciones */

/* Variables para inicializar el storage*/
let usuario = new Usuario ("LauraMontaño" , "Laura1234");
let mascotas = [new Mascota("Sasha", "perro", 5, 10, "golden","./img/perro.png"),
                new Mascota("Manolo", "gato", 12, 4.5, "none","./img/gato.png"),
                new Mascota("Windy", "gato", 8, 4, "none","./img/gato.png")];
let notaRapida = ["Bañar a sasha mañana!"]; 
/* localStorage.setItem('mascotas',JSON.stringify(mascotas));
localStorage.setItem('notaRapida',JSON.stringify(notaRapida)); */


/* Variables con informacion del local storage */
const pets = JSON.parse(localStorage.getItem('mascotas')),
        notes = JSON.parse(localStorage.getItem('notaRapida'));
    //Inicializacion de valores en storage en caso de no tener
    pets & localStorage.setItem('mascotas',JSON.stringify(mascotas));
    notes & localStorage.setItem('notaRapida',JSON.stringify(notaRapida));
    
    console.log(pets);
    console.log(notes);
/* Variables del DOM */
const ingresarBtn = document.getElementById('ingresarBtn'), 
    misMascotasTab = document.getElementById('misMascotasTab'),
    user = document.getElementById('user'),
    psw = document.getElementById('Password'),
    AgregarNotaBtn = document.getElementById('AgregarNotaBtn'),
    AgregarNotaInp = document.getElementById('AgregarNotaInp');
    
    
/* Eventos */
ingresarBtn.addEventListener('click',()=>{
    let usuario = recuperarUsuario();
    (user.value == usuario.user)&&(psw.value == usuario.password)? 
    IniciarSesion(pets ,notes, usuario.user) : alert("Usuario y/o contraseña invalidos.");
});

AgregarNotaBtn.addEventListener('click', ()=>{
    AgregarNotaInp.value!=''? 
    agregarCardNota(notes, AgregarNotaInp.value) : alert("La nota debe tener el menos un caracter");
})


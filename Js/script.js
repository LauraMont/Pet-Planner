/*Index:
Inicio de sesion con solo un usuario 
Se podra visualizar card de las mascotas con poca informacion y las notas rapidas 
Se podran agregar las notas rapidas
Queda pendiete la eliminacion de un nota rapida
*/

/* Clases */
class Usuario {
    constructor(user, psw ,img ,date) {
        this.user = user;
        this.password = psw;
        this.imagen = img;
        this.update = date;
    }
    cambiarDatos(op) {
        switch (op) {
            case ('1'):
                let nuevoUsuario = prompt("Ingrese nuevo usuario");
                this.usuario = nuevoUsuario;
                break;
            case ('2'):
                let nuevaPsw = prompt("Ingrese anterior contraseña");
                if (nuevaPsw = this.password) {
                    nuevaPsw = prompt("Ingrese nueva constraseña");
                    this.password = nuevaPsw
                } else {
                    alert("Contraseña invalida");
                }
                break;
            default: alert("Opcion invalida\n");
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
        this.imagen = imagen;
        this.vacunas = vacunas ;
        this.bitacora = bitacora ;
        let dt = luxon.DateTime.now();
        this.update = dt.toLocaleString(luxon.DateTime.DATETIME_SHORT);
        if(raza != undefined){
            this.raza = raza;
        }
        if(this.imagen == undefined)
        {
            this.imagen = ' ';
        }
        if(this.vacunas == undefined)
        {
            this.vacunas = ' ';
        }
        if(this.bitacora == undefined)
        {
            this.bitacora = ' ';
        }
    }
}
class Nota{
    constructor(description){
        let dt = luxon.DateTime.now();
        this.description = description;
        this.date = dt.toLocaleString(luxon.DateTime.DATETIME_SHORT);
    } 
}
/* Fin de clases */
/* Funciones */
//Agrega una card mascota al final de la lista
function agregarCardMascotaIndex(mascota) {
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
    contenedor.className = "d-flex flex-column align-items-center card bg-petcard pt-3 mx-3";
    document.getElementById("petCards").appendChild(contenedor);
}
//Copia la informacion en cada card correspondiente al orden alfabetico 
//y agrega una con el ultimo elemento que se ingreso
function asignarPetCardsIndex(mascotas) {
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
function agregarCardNota(notas, nota) {
    let listaNotas = document.getElementById('NotasRapidas');
    let id = 0;
    if (nota != undefined) {
        notas.push(nota); //Si hay una nota rapida , debe agregarse a las notas 
    }
    listaNotas.innerHTML = ' ';
    notas.forEach(element => {
        let contenedor = document.createElement("div");
        //Definimos el innerHTML del elemento con una plantilla de texto
        contenedor.innerHTML = `<div  class="card-header">
                                    Fecha: ${element.date}
                                    <a id="${id}" class="btn btn_trash">
                                        <img src="./img/trash.png" alt="">                             
                                    </a>
                                </div>
                                <div  class="card-body">
                                    <p class="card-text">${element.description}</p>
                                </div>`;
        contenedor.className = "card text-dark c2 mb-3";
        document.getElementById("NotasRapidas").appendChild(contenedor);
        id++;
    });
    guardarNotasRapidas(notas)
    actulizarBtsTrash();
}
//Guardar datos del usuario en el storage 
function guardarDatosUsuario(usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
}
//Guardar datos de las mascotas en el storage 
function guardarMascotas(mascotas) {
    localStorage.setItem('mascotas', JSON.stringify(mascotas));
}
//Guardar datos de las notas rapidas en el storage 
function guardarNotasRapidas(notaRapida) {
    localStorage.setItem('notaRapida', JSON.stringify(notaRapida));
}
//Oculta el login y hace visible el home del usuario
function IniciarSesion(mascotas, notas, nombre) {
    const titulo = document.getElementById('tituloPrincipal'),
        home = document.querySelectorAll('.d-none'),
        login = document.querySelectorAll('.d-view');

    titulo.innerText = "Bienvenido/a " + nombre;
    home.forEach(element => {
        element.classList.replace('d-none', 'd-view');
    });
    login.forEach(element => {
        element.classList.replace('d-view', 'd-none');
    });
    asignarPetCardsIndex(mascotas);
    agregarCardNota(notas);
    actulizarBtsTrash();
    localStorage.setItem('sesionActiva', true);
    sesion = JSON.parse(localStorage.getItem('sesionActiva'))
    console.log(sesion);

}
//Oculta el home de usuario y vuelve al login
function LogOut() {
    home = document.querySelectorAll('.d-view'),
        login = document.querySelectorAll('.d-none');

    login.forEach(element => {
        element.classList.replace('d-none', 'd-view');
    });
    home.forEach(element => {
        element.classList.replace('d-view', 'd-none');
    });
}
//Recupero los datos que se guardaron y los retorno
function recuperarUsuario() {
    let user = JSON.parse(localStorage.getItem('usuario'));
    user & localStorage.setItem('usuario', JSON.stringify(usuario));
    return user;
}

/* Fin de Funciones */

/* Variables para inicializar el storage*/
let usuario = new Usuario("LauraMontaño", "Laura1234" ,"./img/anonimo.png" ,"10/14/1983, 1:30 PM");
let mascotas = [new Mascota("Sasha", "perro", 5, 10, "golden", "./img/perro.png"),
new Mascota("Manolo", "gato", 12, 4.5, "none", "./img/gato.png"),
new Mascota("Windy", "gato", 8, 4, "none", "./img/gato.png")];
let notaRapida = [new Nota("Bañar a sasha mañana!")];
let sesionActiva = false;

/* Variables con informacion del local storage */
let pets,
    notes,
    sesion;
//Inicializacion o obtencion de datos en storage 
JSON.parse(localStorage.getItem('mascotas')) ? 
    pets = JSON.parse(localStorage.getItem('mascotas')):
    localStorage.setItem('mascotas', JSON.stringify(mascotas));


JSON.parse(localStorage.getItem('notaRapida')) ?
    notes = JSON.parse(localStorage.getItem('notaRapida')):
    localStorage.setItem('notaRapida', JSON.stringify(notaRapida));
    

JSON.parse(localStorage.getItem('sesionActiva')) ?
    sesion = JSON.parse(localStorage.getItem('sesionActiva')):
    localStorage.setItem('sesionActiva', JSON.stringify(sesionActiva));
/* Variables del DOM */
const ingresarBtn = document.getElementById('ingresarBtn'),
    misMascotasTab = document.getElementById('misMascotasTab'),
    user = document.getElementById('user'),
    psw = document.getElementById('Password'),
    AgregarNotaBtn = document.getElementById('AgregarNotaBtn'),
    AgregarNotaInp = document.getElementById('AgregarNotaInp'),
    BtnTrashNote = document.querySelectorAll(".btn_trash");

/* Eventos */
//Caso donde el usuario sigo con la sesion
if (sesion) {
    IniciarSesion(pets, notes, usuario.user);
    btnLogOut = document.querySelector('#LogOut a');
    BtnCerrarSesion(btnLogOut ,sesion);
} 
//Caso donde el usuario cerro sesion o no ha iniciado aun
else {
    if (ingresarBtn) {
        ingresarBtn.addEventListener('click', (e) => {
            let usuario = recuperarUsuario();
            if ((user.value == usuario.user) && (psw.value == usuario.password)) {
                btnLogOut = document.querySelector('#LogOut a');
                BtnCerrarSesion(btnLogOut ,sesion);
                IniciarSesion(pets, notes, usuario.user);
            }
            else {
                Swal.fire('Login', 'Usuario y/o contraseña invalidos.', 'error');
            }
            e.preventDefault();
        });
    }
}
//Evento del boton de login
if (AgregarNotaBtn) {
    AgregarNotaBtn.addEventListener('click', () => {
        if (AgregarNotaInp.value != '') {
            agregarCardNota(notes, new Nota(AgregarNotaInp.value));
            Toastify({
                text: "Nota agregada",
                duration: 3000,
                newWindow: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #76BA99, #76BA99)",
                    color: "black",
                    border: "solid 1px grey",
                },
            }).showToast();
            actulizarBtsTrash()
        } else {
            Swal.fire('Descripcion de Nota Rapida', 'La Descripcion debe tener el menos un caracter', 'warning');
        }
    })
}
//Agrega event a cada boton de las cards
function actulizarBtsTrash() {
    const BtnTrashNote = document.querySelectorAll(".btn_trash");
    BtnTrashNote.forEach(note => {
        note.addEventListener('click', () => {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    let index = note.id;
                    console.log(index);
                    notes.splice(index, 1);
                    guardarNotasRapidas(notes);
                    agregarCardNota(notes)
                }
            })
        }
        );
    });
}
//Evento del boton de log out (es una funcion ya que puede no aparecer al cargarse la pagina)
function BtnCerrarSesion(btnLogOut ,sesion) {
    btnLogOut.addEventListener('click', () => {
        localStorage.setItem('sesionActiva', false);
        sesion = JSON.parse(localStorage.getItem('sesionActiva'))
        LogOut();
    });
}

/* fetch */
async function bringData(){
    let animales ,
        avatares ;
    const response = await fetch('./Js/data.json');
    const data = await response.json();
    //Se cargan los datos correspondientes a cada array
    animales = data.filter((e) => e.Tipo == "animal");
    avatares = data.filter((e) => e.Tipo == "avatar");
    localStorage.setItem('animales', JSON.stringify(animales));
    localStorage.setItem('avatares', JSON.stringify(avatares));
}
window.onload = ()=>{
    bringData();
}

/* Mascotas:
Se visualiza las cards de las mascotas que estan en el storage al ingresar
Se puede agregar una mascota a la lista con el formulario (el obligatorio el campo de nombre)
Las cards se ordenaran por orden alfabetico
Queda pendiente la eliminacion de las cards junto con su edicion
 */
/* Clases */
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
        if(this.imagen == undefined)
        {
            this.imagen = ' ';
        }
    }
}
/* Funciones */
//Agrega una card mascota a la lista
function agregarCardMascota(mascota){
    let contenedor = document.createElement("div");
    //Agregamos perfil a la pagina de mascotas
    contenedor.innerHTML = `<div class="row g-0 d-flex flex-column align-items-center">
                                <div class="col-md-4">
                                    <img src="${mascota.imagen}" class="img-fluid rounded-start" alt="...">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">${mascota.nombre}</h5>
                                        <p class="card-text datos">
                                            Edad: ${mascota.edad}
                                            <br>Especie: ${mascota.especie}
                                            <br>Raza: ${mascota.raza}
                                            <br>Bitacora: ${mascota.bitacora}
                                            <br>Vacunas: ${mascota.vacunas}
                                        </p>
                                        <p class="card-text text-white mb-1"><small class="text-white">Last updated 3 mins ago</small></p>
                                    </div>
                                </div>
                                <div class="col-md-8 d-flex justify-content-evenly mb-3">
                                    <a class="btn btn_trash">
                                        <img src="./img/trash.png" alt="">                             
                                    </a>
                                    <a class="btn btn_edit">
                                        <img src="./img/editar-texto.png" alt="">                             
                                    </a>
                                </div>
                                
                            </div>`;
contenedor.className = "card mb-3  card bg-petcard pt-3 mx-3";
document.getElementById("listaMascotas").appendChild(contenedor);
}
//Copia la informacion en cada card correspondiente al orden alfabetico 
//y agrega una con el ultimo elemento que se ingreso
function asignarPetCardsMascotas(mascotas){
    const lista = document.getElementById("listaMascotas");
    lista.innerHTML = ' ';
    mascotas.forEach(element => {
        agregarCardMascota(element);
    });
    guardarMascotas(mascotas);
}
//Actualiza los datos de las mascotas en el storage
function guardarMascotas(mascotas){
    localStorage.setItem('mascotas', JSON.stringify(mascotas));
}
//Actualiza a la hora actual ante alguna modificacion
function ActualizarHora(hora ,user){
    let dt = DateTime.now();
    dt = dt.toLocaleString(DateTime.DATETIME_SHORT);
    hora.innerHTML = "Ultima actualizacion " + dt;
    user.update = dt;
    guardarDatosUsuario(user);
}
/* Variables de DOM y storage*/
const pets = JSON.parse(localStorage.getItem('mascotas')),
    AgregarBtn = document.getElementById('AgregarBtn') ,
    Nombre = document.getElementById('Nombre'),
    Especie = document.getElementById('Especie'),
    Edad = document.getElementById('Edad'),
    Raza = document.getElementById('Raza'),
    Peso = document.getElementById('Peso'),
    Imagen = document.getElementById('animales');
let sesion = JSON.parse(localStorage.getItem('sesionActiva'));
/* Eventos */
//Agrega event a cada boton-trash de las cards
function actulizarBtnpet(){
    const BtnTrashPet = document.querySelectorAll(".btn_trash");
    BtnTrashPet.forEach((mascota,index) => {
        mascota.addEventListener('click', () => {
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
                    console.log(index);
                    pets.splice(index, 1);
                    asignarPetCardsMascotas(pets);
                    guardarMascotas(pets);
                }
            })
        }
        );
    });
}
//Agrega event a cada boton-edit de las cards
function actulizarEditpet(){
    const BtnEditPet = document.querySelectorAll(".btn_edit");
    BtnEditPet.forEach((mascota,index) => {
        mascota.addEventListener('click', () => {
            const { value: dato } =  Swal.fire({
                title: 'Selecciona el dato que quieres cambiar',
                input: 'select',
                inputOptions: {
                    'nombre': 'Nombre',
                    'especie': 'Especie',
                    'edad': 'Edad',
                    'peso': 'Peso',
                    'raza': 'Raza',
                    'imagen': 'Imagen',
                    'vacunas': 'Vacunas',
                    'bitacora': 'Bitacora',
                },
                inputPlaceholder: 'Selecciona un dato',
                showCancelButton: true,
                inputValidator: (value) => {
                    return new Promise((resolve) => {
                        if (value ) {
                            const { value: data } =  Swal.fire({
                                title: `Ingresar nueva informacion(${value}) `,
                                input: 'text',
                                inputPlaceholder: 'Ingresa nuevo dato',
                                inputAttributes: {
                                    maxlength: 50,
                                    autocapitalize: 'off',
                                    autocorrect: 'off'
                                }
                            }) 
                        }
                    })
                }
            })
        }
        );
    });
}
//Inicializa el evento del log out 
function BtnCerrarSesion(btnLogOut ,sesion) {
    btnLogOut.addEventListener('click', () => {
        localStorage.setItem('sesionActiva', false);
        sesion = JSON.parse(localStorage.getItem('sesionActiva'))
        console.log(sesion)
        LogOut();
    });
}
//Evento del boton del formulario para agregar una nueva mascota
AgregarBtn.addEventListener('click', ()=>{
    if(Nombre.value && Nombre.value!=" "){
        pets.push(new Mascota(Nombre.value, Especie.value,Edad.value, Peso.value, Raza.value, Imagen.value));
        pets.sort((a, b) => {//Ordena por orden alfabetico la lista de mascotas
            if (a.nombre.toUpperCase() > b.nombre.toUpperCase()) {
                return 1;
            }
            if (a.nombre.toUpperCase() < b.nombre.toUpperCase()) {
                return -1;
            }
            // a es igual a b
            return 0;
        }) 
    asignarPetCardsMascotas(pets) ;
    actulizarBtnpet();
    actulizarEditpet();
    }else{
        Swal.fire('Nombre de mascota','El campo nombre es obligatorio','error');
    }
})

window.onload = ()=>{
    asignarPetCardsMascotas(pets);
    actulizarBtnpet();
    actulizarEditpet()
    btnLogOut = document.querySelector('#LogOut a');
    BtnCerrarSesion(btnLogOut ,sesion);
}

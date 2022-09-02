/* Mascotas:
Se visualiza las cards de las mascotas que estan en el storage al ingresar
Se puede agregar una mascota a la lista con el formulario (el obligatorio el campo de nombre)
Las cards se ordenaran por orden alfabetico
Queda pendiente la eliminacion de las cards junto con su edicion
 */
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
                                            <br>Peso: ${mascota.peso}
                                            <br>Bitacora: ${mascota.bitacora}
                                            <br>Vacunas: ${mascota.vacunas}
                                        </p>
                                        <p class="card-text text-white mb-1"><small class="text-white">Last updated: ${mascota.update}</small></p>
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
//Agrega las opciones al select "tipo de mascota"
function AgregarOpciones(){
    let animales = JSON.parse(localStorage.getItem('animales'));
    animales.forEach(element => {
        agregar(element);
    });
}
//Agrega una option
function agregar(element){
    let contenedor = document.createElement("option");
    contenedor.value =`${element.imagen}`
    contenedor.innerHTML = `${element.nombre}`;
    document.getElementById("animales").appendChild(contenedor);
}
//Toastify que presenta el msj
function CardMascota_Toasty(msj){
    Toastify({
        text: msj,
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
}
/* Fin de funciones */
/* Variables de DOM y storage*/
let pets = JSON.parse(localStorage.getItem('mascotas')),
    AgregarBtn = document.getElementById('AgregarBtn') ,
    Nombre = document.getElementById('Nombre'),
    Especie = document.getElementById('Especie'),
    Edad = document.getElementById('Edad'),
    Raza = document.getElementById('Raza'),
    Peso = document.getElementById('Peso'),
    bitacora = document.getElementById('bitacora'),
    vacunas = document.getElementById('vacunas'),
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
                    console.log(index);
                    pets.splice(index, 1);
                    asignarPetCardsMascotas(pets);
                    guardarMascotas(pets);
                    CardMascota_Toasty(`Se actualizo lista de mascotas con exito`);
                }
            })
        }
        );
    });
}
//Agrega event a cada boton-edit de las cards
function actulizarEditpet(pets){
    const BtnEditPet = document.querySelectorAll(".btn_edit");
    BtnEditPet.forEach((mascota,index) => {
        mascota.addEventListener('click', () => {
            //Modal para elegir el dato que se edita
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
                inputValidator: (campo) => {
                    return new Promise((resolve) => {
                        if(campo == 'imagen'){
                            //Modal para elegir cambiar la imagen 
                            let imagenes = JSON.parse(localStorage.getItem('animales'));
                            const { value: mascota } = Swal.fire({
                                title:`Seleccionar ${campo} `,
                                input: 'select',
                                inputOptions: {
                                    "./img/gato.png": "gato",
                                    "./img/conejo.png": "conejo",
                                    "./img/fox.png": "zorro",
                                    "./img/turtle.png": "tortuga",
                                    "./img/hen.png": "gallina",
                                    "./img//clown-fish.png": "pez",
                                    "./img/chameleon.png": "camaleon",
                                    "./img/perro.png": "perro",
                                    "./img/otro.png": "otro"
                                },
                                inputPlaceholder: 'Elija una mascota',
                                showCancelButton: true,
                                inputValidator: (value) => {
                                    return new Promise((resolve) => {
                                    if (value) {
                                        pets[index][`${campo}`]=value;
                                        let dt = luxon.DateTime.now();
                                        pets[index]['update'] = dt.toLocaleString(luxon.DateTime.DATETIME_SHORT);
                                        asignarPetCardsMascotas(pets);
                                        guardarMascotas(pets);
                                        actulizarBtnpet();
                                        actulizarEditpet(pets);
                                        CardMascota_Toasty(`Se actualizó la información de ${pets[index].nombre}`);
                                        resolve();
                                    }
                                    })
                                }
                                })
                                
                            
                        }else if (campo ) {
                            //Modal para cambiar el resto de los datos
                            const { value: data } =  Swal.fire({
                                title: `Ingresar nueva informacion(${campo}) `,
                                input: 'text',
                                inputPlaceholder: 'Ingresa nuevo dato',
                                showCancelButton: true,
                                inputAttributes: {
                                    maxlength: 50,
                                    autocapitalize: 'off',
                                    autocorrect: 'off'
                                },
                                inputValidator: (value) =>{
                                    if (value){
                                        //guardar dato
                                        pets[index][`${campo}`]=value;
                                        let dt = luxon.DateTime.now();
                                        pets[index]['update'] = dt.toLocaleString(luxon.DateTime.DATETIME_SHORT);
                                        asignarPetCardsMascotas(pets);
                                        actulizarBtnpet();
                                        actulizarEditpet(pets);
                                        guardarMascotas(pets);
                                        CardMascota_Toasty(`Se actualizó la información de ${pets[index].nombre}`)
                                    }
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
        pets.push(new Mascota(Nombre.value, Especie.value,Edad.value, Peso.value, Raza.value, Imagen.value ,vacunas.value ,bitacora.value));
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
    CardMascota_Toasty(`Se agrego mascota con exito: Bienvenido/a ${Nombre.value}!!`)
    }else{
        Swal.fire('Nombre de mascota','El campo nombre es obligatorio','error');
    }
})

window.onload = ()=>{
    asignarPetCardsMascotas(pets);
    actulizarBtnpet();
    actulizarEditpet(pets)
    btnLogOut = document.querySelector('#LogOut a');
    BtnCerrarSesion(btnLogOut ,sesion);
    AgregarOpciones();
}

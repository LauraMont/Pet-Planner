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
function agregarCardMascotaMisMascotas(mascota){
    let contenedor = document.createElement("div");
/*     if(mascota.imagen == undefined)
        {
            mascota.imagen = ' ';
        } */
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
                            </div>`;
contenedor.className = "card mb-3  card bg-petcard pt-3";
document.getElementById("listaMascotas").appendChild(contenedor);
}

//Copia la informacion en cada card correspondiente al orden alfabetico 
//y agrega una con el ultimo elemento que se ingreso
function asignarPetCardsMascotas(mascotas){
    const lista = document.getElementById("listaMascotas");
    lista.innerHTML = ' ';
    mascotas.forEach(element => {
        agregarCardMascotaMisMascotas(element);
        console.log(element.imagen);
    });
    guardarMascotas(mascotas);
}

function guardarMascotas(mascotas){
    localStorage.setItem('mascotas', JSON.stringify(mascotas));
}
/* Inicializar variables en el storage */
let mascotas = [new Mascota("Sasha", "perro", 5, 10, "golden","./img/perro.png"),
                new Mascota("Manolo", "gato", 12, 4.5, "none","./img/gato.png"),
                new Mascota("Windy", "gato", 8, 4, "none","./img/gato.png")];

/* Variables de DOM y storage*/
const pets = JSON.parse(localStorage.getItem('mascotas'));
AgregarBtn = document.getElementById('AgregarBtn') ,
            Nombre = document.getElementById('Nombre'),
            Especie = document.getElementById('Especie'),
            Edad = document.getElementById('Edad'),
            Raza = document.getElementById('Raza'),
            Peso = document.getElementById('Peso'),
            Imagen = document.getElementById('imagen');

/* Eventos */
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
    }else{
        alert("El campo nombre es obligatorio");    
    }
})

window.onload = ()=>{
    pets & localStorage.setItem('mascotas',JSON.stringify(mascotas)); 
    asignarPetCardsMascotas(pets);
}



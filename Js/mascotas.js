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
    }
}
/* Funciones */
function agregarCardMascotaMisMascotas(mascota){
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
/* Variables */
/* let mascotas = [new Mascota("Sasha", "especie", 5, 10, "golden","./img/perro.png")];
localStorage.setItem('mascotas',JSON.stringify(mascotas)); */

const pets = JSON.parse(localStorage.getItem('mascotas')),
notes = JSON.parse(localStorage.getItem('notaRapida')),
AgregarBtn = document.getElementById('AgregarBtn') ,
            Nombre = document.getElementById('Nombre'),
            Especie = document.getElementById('Especie'),
            Edad = document.getElementById('Edad'),
            Raza = document.getElementById('Raza'),
            Peso = document.getElementById('Peso'),
            Imagen = document.getElementById('imagen');

/* Eventos */
AgregarBtn.addEventListener('click', ()=>{
    pets.push(new Mascota(Nombre.value, Especie.value, Edad.value, Peso.value, Raza.value, Imagen.value));
    guardarMascotas(pets);
    asignarPetCardsMascotas(pets);
})

window.onload = ()=>{
    asignarPetCardsMascotas(pets);
}



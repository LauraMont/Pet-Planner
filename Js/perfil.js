
/* Funciones */
//Funcion que cambia una variable en el storage que me indica si queda iniciada la sesion
function BtnCerrarSesion() {
    let btnLogOut = document.querySelector('#LogOut a');
    btnLogOut.addEventListener('click', () => {
        localStorage.setItem('sesionActiva', false);
        sesion = JSON.parse(localStorage.getItem('sesionActiva'))
        console.log(sesion)
        LogOut();
    });
}
//Guarda los datos del usuario en el storage
function guardarDatosUsuario(usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
}
//Actualiza a la hora actual ante alguna modificacion
function ActualizarHora(hora ,user){
    let dt = luxon.DateTime.now();
    dt = dt.toLocaleString(luxon.DateTime.DATETIME_SHORT);
    hora.innerHTML = "Ultima actualizacion " + dt;
    user.update = dt;
    guardarDatosUsuario(user);
}
//Agrega al select de avatares las opciones
function AgregarOpciones(){
    let avatares = JSON.parse(localStorage.getItem('avatares'));
    avatares.forEach(element => {
        agregar(element);
    });
}
//Agrega estructura de una opcion
function agregar(element){
    let contenedor = document.createElement("option");
    contenedor.value =`${element.imagen}`
    contenedor.innerHTML = `${element.nombre}`;
    document.getElementById("selectAvatar").appendChild(contenedor);
}
//Actualiza la informacion de la card donde se presenta la informacion del usuario
function ActualizarInfoCard(user){
    let seleccionado = document.getElementById('selected');
    let avatares = JSON.parse(localStorage.getItem('avatares'));
    nombre.innerHTML += user.user;
    psw.innerHTML += user.password;
    document.getElementById("Avatar").src=user.imagen;
    hora.innerHTML = "Ultima actualizacion " + user.update;
    seleccionado.innerHTML = avatares.find(element => element.imagen==user.imagen).nombre;
}
function PerfilToastify(msj){
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
/* Variables de DOM y storage*/
let sesion = JSON.parse(localStorage.getItem('sesionActiva'));
    /*Card de info de usuario  */
let user = JSON.parse(localStorage.getItem('usuario')),
    selectAvatar = document.getElementById('selectAvatar'),
    nombre = document.querySelector('.card-body .card-title'),
    psw = document.querySelector('.card-body .psw'),
    hora = document.querySelector('.text-muted');
    /* Formulario */
let anteriorPsw =  document.getElementById('anteriorPsw'),
    nuevaPsw =  document.getElementById('nuevaPsw'),
    inputPsw =  document.getElementById('inputPsw'),
    nuevoUser =  document.getElementById('nuevoUser'),
    cambiarPswBtn =  document.getElementById('cambiarPswBtn'),
    cambiarUserBtn =  document.getElementById('cambiarUserBtn');
/* Events */
//evento para boton de formulario de cambio de contraseña
cambiarPswBtn.addEventListener('click' ,()=>{
    if((anteriorPsw.value == user.password) && (nuevaPsw.value.toString().length>5)){
        user.password = nuevaPsw.value;
        guardarDatosUsuario(user);
        psw.innerHTML = "Nombre: " + user.password;
        ActualizarHora(hora ,user);
        PerfilToastify("Se actualizo la constraseña con exito");
    }else{
        Swal.fire('Contraseña invalida', 'La contraseña no coincide con la actual o es menor a 6 caracteres', 'error');
    }
} );
//evento para boton de formulario de cambio de nombre
cambiarUserBtn.addEventListener('click' ,()=>{
    if(inputPsw.value == user.password){
        user.user = nuevoUser.value;
        guardarDatosUsuario(user);
        nombre.innerHTML = "Usuario: " + user.user;
        ActualizarHora(hora ,user);
        PerfilToastify("Se actualizo usuario con exito");
    }else{
        Swal.fire('Contraseña invalida', 'La contraseña no coincide con la actual o la nueva contraseña es menor a caracteres', 'error');
    }
} );
//Cambia automaticamente el avatar del usuario 
selectAvatar.addEventListener('change' ,()=>{
    document.getElementById("Avatar").src=selectAvatar.value;
    user.imagen = selectAvatar.value;
    guardarDatosUsuario(user);
})
window.onload = ()=>{
    BtnCerrarSesion();
    ActualizarInfoCard(user)
    AgregarOpciones();
}


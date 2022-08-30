
/* Funciones */
//Funcion que cambia una variable en el storage que me indica si queda iniciada la sesion
function BtnCerrarSesion(btnLogOut ,sesion) {
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
    let dt = DateTime.now();
    dt = dt.toLocaleString(DateTime.DATETIME_SHORT);
    hora.innerHTML = "Ultima actualizacion " + dt;
    user.update = dt;
    guardarDatosUsuario(user);
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
        psw.innerHTML = user.password;
        ActualizarHora(hora ,user);
    }else{
        Swal.fire('Contraseña invalida', 'La contraseña no coincide con la actual.', 'error');
    }
} );
//evento para boton de formulario de cambio de nombre
cambiarUserBtn.addEventListener('click' ,()=>{
    if(inputPsw.value == user.password){
        user.user = nuevoUser.value;
        guardarDatosUsuario(user);
        psw.innerHTML = user.password;
        ActualizarHora(hora ,user);
    }else{
        Swal.fire('Contraseña invalida', 'La contraseña no coincide con la actual.', 'error');
    }
} );
//Cambia automaticamente el avatar del usuario 
selectAvatar.addEventListener('change' ,()=>{
    document.getElementById("Avatar").src=selectAvatar.value;
    user.imagen = selectAvatar.value;
    guardarDatosUsuario(user);
})

window.onload = ()=>{
    btnLogOut = document.querySelector('#LogOut a');
    BtnCerrarSesion(btnLogOut ,sesion);
    nombre.innerHTML += user.user;
    psw.innerHTML += user.password;
    document.getElementById("Avatar").src=user.imagen;
    hora.innerHTML = "Ultima actualizacion " + user.update;
    AgregarOpciones();
}

function AgregarOpciones(){
    let avatares = JSON.parse(localStorage.getItem('avatares'));
    console.log(avatares);
    avatares.forEach(element => {
        agregar(element);
    });
}
function agregar(element){
    let contenedor = document.createElement("option");
    contenedor.value =`${element.imagen}`
    contenedor.innerHTML = `${element.nombre}`;
    document.getElementById("selectAvatar").appendChild(contenedor);
}
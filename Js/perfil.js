
/* Funciones */
function BtnCerrarSesion(btnLogOut ,sesion) {
    btnLogOut.addEventListener('click', () => {
        localStorage.setItem('sesionActiva', false);
        sesion = JSON.parse(localStorage.getItem('sesionActiva'))
        console.log(sesion)
        LogOut();
    });
}
function guardarDatosUsuario(usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
}
/* Variables de DOM y storage*/
let sesion = JSON.parse(localStorage.getItem('sesionActiva')),
    /*Card de info de usuario  */
    user = JSON.parse(localStorage.getItem('usuario')),
    selectAvatar = document.getElementById('selectAvatar'),
    nombre = document.querySelector('.card-body .card-title'),
    psw = document.querySelector('.card-body .psw'),
    /* Formulario */
    anteriorPsw =  document.getElementById('anteriorPsw'),
    nuevaPsw =  document.getElementById('nuevaPsw'),
    inputPsw =  document.getElementById('inputPsw'),
    nuevoUser =  document.getElementById('nuevoUser'),
    cambiarPswBtn =  document.getElementById('cambiarPswBtn'),
    cambiarUserBtn =  document.getElementById('cambiarUserBtn');

/* Events */
cambiarPswBtn.addEventListener('click' ,()=>{
    if((anteriorPsw.value == user.password) && (nuevaPsw.value.toString().length>5)){
        user.password = nuevaPsw.value;
        guardarDatosUsuario(user);
        psw.innerHTML = user.password;
    }else{
        alert("no es valido");
    }
} );
cambiarUserBtn.addEventListener('click' ,()=>{
    if(inputPsw.value == user.password){
        user.user = nuevoUser.value;
        guardarDatosUsuario(user);
        psw.innerHTML = user.password;
    }else{
        alert("no es valido");
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
}
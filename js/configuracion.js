async function borrar(){
    const id= localStorage.getItem('id_usuario')
    let response = await fetch("http://localhost:8080/api/v1/tfg/"+id, {
        method: 'DELETE'
    })

    if(response.ok){
        localStorage.removeItem('id_usuario');
        localStorage.removeItem('nombre_usuario');
        localStorage.removeItem('email');
        localStorage.removeItem('contrasena');
        window.location.href= 'login.html';
    }

}

document.getElementById('cerrar-sesion').addEventListener('click', () => {
    localStorage.clear()
    window.location.href = 'login.html'
})


window.addEventListener('load', () => {
    document.getElementById('inputUser').value = localStorage.getItem('nombre_usuario');
    document.getElementById('inputEmail').value = localStorage.getItem('email');
})


if(localStorage.getItem('id_usuario')==null){
    window.location.href = 'login.html';
}

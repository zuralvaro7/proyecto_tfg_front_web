if(localStorage.getItem('id_usuario')==null){
    window.location.href = 'login.html';
}

document.getElementById('inputUser').value = localStorage.getItem('nombre_usuario');
document.getElementById('inputEmail').value = localStorage.getItem('email');
document.getElementById('guardar').onclick = guardar;


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

async function guardar(){
    const id= parseInt(localStorage.getItem('id_usuario'));
    let response = await fetch(`http://localhost:8080/api/v1/tfg/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            "nombre_usuario": document.getElementById('inputUser').value,
            "contrasena": localStorage.getItem('contrasena'),
            "email": document.getElementById('inputEmail').value,
        })
    })
    const resultado = await response.json();
    if (!response.ok) {
        console.error(response);
        document.querySelectorAll("[id$='_error']").forEach(el => {
            el.textContent = "";
            el.style.display = 'none'
        });

        resultado.forEach(error => {
            console.error(`Campo: ${error.field} - ${error.defaultMessage}`);

            const elemento = document.getElementById(error.field + "_error");
            if (elemento) {
                elemento.textContent = error.defaultMessage;
                elemento.style.display = 'block';
            }
        });
    } else {

        localStorage.setItem('nombre_usuario', resultado.nombre_usuario);
        localStorage.setItem('email', resultado.email);



        cancelar();
    }
}


document.getElementById('cerrar-sesion').addEventListener('click', () => {
    localStorage.clear()
    window.location.href = 'login.html'
})


document.getElementById('editar').addEventListener('click', () => {
    document.getElementById('editar').style.display = 'none';

    document.getElementById('inputUser').disabled = false;
    document.getElementById('inputEmail').disabled = false;

    document.getElementById('cancelar').style.display = 'inline';
    document.getElementById('guardar').style.display = 'inline';
});

document.getElementById('cancelar').addEventListener('click', cancelar);


function cancelar(){
    document.getElementById('editar').style.display = 'inline';

    let user = document.getElementById('inputUser');
    let email = document.getElementById('inputEmail');
    user.disabled = true;
    email.disabled = true;
    user.value =  localStorage.getItem('nombre_usuario');
    email.value =  localStorage.getItem('email');



    document.getElementById('cancelar').style.display = 'none';
    document.getElementById('guardar').style.display = 'none';
}


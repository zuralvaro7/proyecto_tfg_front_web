async function registro(){
    let username = document.getElementById('inputUser').value;
    let email = document.getElementById('inputEmail').value;
    let password = document.getElementById('inputPassword').value;
    let response = await fetch('http://localhost:8080/api/v1/tfg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            "nombre_usuario": username,
            "email": email,
            "contrasena": password,
            "esLogin": false
        })
    })
    const resultado = await response.json();
    if(!response.ok){
        document.querySelectorAll("[id$='_error']").forEach(el => {
            el.textContent = "";
            el.style.display = 'none'
        });
        resultado.forEach(error => {
            console.error(`Campo: ${error.field} - ${error.defaultMessage}`);

            const elemento = document.getElementById(error.field + "_error");
            if (elemento) { // ← comprueba que existe antes de asignar
                elemento.textContent = error.defaultMessage;
                elemento.style.display = 'block';
            }
        });
    } else {
        localStorage.setItem('id_usuario', resultado.id_usuario);
        localStorage.setItem('nombre_usuario', resultado.nombre_usuario);
        localStorage.setItem('email', resultado.email);
        localStorage.setItem('contrasena', resultado.contrasena);
        window.location.href= 'index.html';
    }
}


async function login(){
    let username = document.getElementById('inputUser').value;
    let password = document.getElementById('inputPassword').value;
    let response = await fetch('http://localhost:8080/api/v1/tfg/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            "nombre_usuario": username,
            "contrasena": password,
            "esLogin": true
        })
    })
    const resultado = await response.json();
    if(!response.ok){
        document.querySelectorAll("[id$='_error']").forEach(el => {
            el.textContent = "";
            el.style.display = 'none'
        });
        resultado.forEach(error => {
            console.error(`Campo: ${error.field} - ${error.defaultMessage}`);

            const elemento = document.getElementById(error.field + "_error");
            if (elemento) { // ← comprueba que existe antes de asignar
                elemento.textContent = error.defaultMessage;
                elemento.style.display = 'block';
            }
        });
    } else {
        localStorage.setItem('id_usuario', resultado.id_usuario);
        localStorage.setItem('nombre_usuario', resultado.nombre_usuario);
        localStorage.setItem('email', resultado.email);
        localStorage.setItem('contrasena', resultado.contrasena);
        window.location.href= 'index.html';
    }

}
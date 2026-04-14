async function cargarHistorial() {
    let response = await fetch(`http://localhost:8080/api/v1/tfg/historial`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            "id_usuario": localStorage.getItem('id_usuario'),
            "nombre_usuario": localStorage.getItem("nombre_usuario"),
            "contrasena": localStorage.getItem('contrasena'),
            "email": localStorage.getItem('email'),
        })
    })
    const resultado = await response.json();
    if (!response.ok) {
        // Log the specific message from the server if it exists
        // console.error("Fetch failed:", resultado.message || resultado);
        // Optional: redirect to login if unauthorized
        window.location.href = 'login.html';
    } else {
        resultado.forEach(datos => {
            document.querySelectorAll(".tabla").forEach(el => {
                el.appendChild(document.createElement("tr")).classList.add("linea");
                datos.forEach(dato => {
                    el.appendChild(document.createElement("td")).innerHTML = dato;



                })

                console.log(datos);
            });
        });
    }
}

window.onload = cargarHistorial();
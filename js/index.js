if(localStorage.getItem('id_usuario')==null){
     window.location.href = 'login.html';
}


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
            document.querySelectorAll(".tbody").forEach(el => {
                tr = document.createElement("tr");
                for(let i = 1; i < datos.length-1; i++) {
                    td = document.createElement("td");
                    if(i==1){
                        td.scope = "row";
                        td.innerHTML = datos[1];
                        tr.appendChild(td).classList.add("ps-3");
                    } else if(i==3) {
                        td.innerHTML = parseDate(datos[3]);
                        tr.appendChild(td).classList.add("ps-3");
                        tr.appendChild(td).classList.add("text-center");
                    }else {
                        td.innerHTML = datos[i];
                        tr.appendChild(td).classList.add("text-center");
                    }
                }

                el.appendChild(tr);
            });
        });
    }
}

window.onload = cargarHistorial();


/**
 * Dar formato a la siguiente fecha 2025-06-14
 */
function parseDate(dateString){
    try {
        dateStringC = dateString.split('-');
        if (dateStringC.length > 2) {
            return dateStringC[2]+"-"+dateStringC[1]+"-"+dateStringC[0];
        }else {
            return dateString;
        }
    }catch(e){
        console.error(e);
        return dateString;
    }
}


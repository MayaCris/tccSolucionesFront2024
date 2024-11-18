export async function registrarMercancia(datosMercancia){
    //1. Crear la URL del servicio
    const URL = "http://localhost:8080/soluciontcc/v1/mercancias";
    //2. Configuración de la petición de envío de datos
    let peticion = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'
        },
        body:JSON.stringify(datosMercancia)
    }
    //3. Llamar a la promesa fetch con la URL y la configuración de la petición

    try {
        let respuestaServidor = await fetch(URL, peticion)
        console.log("Respuesta servidor: ", respuestaServidor);
        if (respuestaServidor.ok) {
            let respuestaFinal = await respuestaServidor.json();
            console.log("Registro exitoso:", respuestaFinal);
            Swal.fire({
                icon: "success",
                title: "Registro exitoso",
                text: "La mercancía se registró correctamente"
            });
            return respuestaFinal;

        } else {
            // Si no es exitosa, maneja el error y extrae el mensaje
            let errorRespuesta = await respuestaServidor.json();

            Swal.fire({
                icon: "error",
                title: "Error en el registro",
                text: errorRespuesta.mensaje || "Ocurrió un error inesperado"
            });
            throw new Error(errorRespuesta.mensaje || "Error en la solicitud");
        }

    } catch (error) {
        console.error("Error de red o inesperado: ", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message || "Ocurrió un error inesperado"
        });
    }
}
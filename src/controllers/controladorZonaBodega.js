import { consultarBodegas } from "../services/servicioConsultarBodegas.js";
import { registrarBodega } from "../services/servicioRegistrarBodega.js";

let botonRegistroBodega = document.getElementById('botonRegistroBodega');
let nombreBodega = document.getElementById('nombrezonabodega');
let capacidadMaximaVolumen = document.getElementById('capacidadmaximavolumen');
let capacidadMaximaPeso = document.getElementById('capacidadmaximapeso');


botonRegistroBodega.addEventListener('click', function(evento){
    evento.preventDefault();
    let objetoBodega = {
        nombreZona : nombreBodega.value,
        capacidadMaximaVolumen : capacidadMaximaVolumen.value,
        capacidadMaximaPeso : capacidadMaximaPeso.value
    }

    try {
        if(objetoBodega.nombreZona === "" || objetoBodega.capacidadMaximaVolumen === "" || objetoBodega.capacidadMaximaPeso === ""){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor llene todos los campos!"
            });
            return;
        }
        console.log("Objeto bodega:", objetoBodega);
        registrarBodega(objetoBodega)
        .then(function(respuesta){
            if(respuesta){
                Swal.fire({
                    title: "Buen trabajo!",
                    text: "Bodega registrada exitosamente",
                    icon: "success"
                });
            }
        });
    } catch (error) {
        console.log(error)
    }

});

//Llmando a la API

//Llamando al servicio de consulta de bodegas
let filaBodegas=document.getElementById('bodega')
consultarBodegas()
.then(function(respuesta){
    console.log("La respuesta de bodegas es: ", respuesta)
    if(Array.isArray(respuesta)){
        respuesta.forEach(function(bodega){
            let option=document.createElement('option');
            option.textContent=bodega.nombreZona;
            option.value=bodega.idZona;

            filaBodegas.appendChild(option);
        });
    }
        
})

document.getElementById('bodega').addEventListener('change', function() {
    if (this.value === "") {
        //Cambiar alerta por un mensaje en pantalla
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Seleccione una bodega!"
          });
    }
});
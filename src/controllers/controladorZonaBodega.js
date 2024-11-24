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


//Llamando al servicio de consulta de bodegas
let selectBodegas=document.getElementById('bodega')
consultarBodegas()
.then(function(respuesta){
    if(Array.isArray(respuesta)){
        respuesta.forEach(function(bodega){
            let option=document.createElement('option');
            option.textContent=bodega.nombreZona;
            option.value=bodega.idZona;

            selectBodegas.appendChild(option);
        });
    }   
});

//Creación de tabla de bodegas
let filatablabodega=document.getElementById('filatablabodega')
consultarBodegas()
.then(function(respuesta){
    if(Array.isArray(respuesta)){
        respuesta.forEach(function(bodega){
            let fila=document.createElement('tr');
            
            let colIdZona=document.createElement('td');
            colIdZona.textContent=bodega.idZona;

            let colNombre=document.createElement('td');
            colNombre.textContent=bodega.nombreZona;
            
            let colCapacidadMaxPeso=document.createElement('td');
            colCapacidadMaxPeso.textContent=bodega.capacidadMaximaPeso;

            let colCapacidadOcupadaPeso=document.createElement('td');
            colCapacidadOcupadaPeso.textContent=bodega.capacidadPesoOcupado;

            let colVolumen=document.createElement('td');
            colVolumen.textContent=bodega.capacidadMaximaVolumen;

            let colCapacidadOcupadaVolumen=document.createElement('td');
            colCapacidadOcupadaVolumen.textContent=bodega.capacidadVolumenOcupado;

            fila.appendChild(colIdZona);
            fila.appendChild(colNombre);
            fila.appendChild(colCapacidadMaxPeso);
            fila.appendChild(colCapacidadOcupadaPeso);
            fila.appendChild(colVolumen);
            fila.appendChild(colCapacidadOcupadaVolumen);
            filatablabodega.appendChild(fila)
        });
    }});

document.getElementById('bodega').addEventListener('change', function() {
    if (this.value === "") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Seleccione una bodega!"
          });
    }
});
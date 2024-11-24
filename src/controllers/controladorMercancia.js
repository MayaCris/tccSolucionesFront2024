import { registrarMercancia } from "../services/servicioRegistrarMercancia.js";
import { consultarMercancias } from "../services/servicioConsultarMercancia.js";
import { consultarBodegas } from "../services/servicioConsultarBodegas.js";
import { consultarBodegaPorId } from "../services/servicioConsultarBodegaPorId.js";

let botonRegistroMercancia = document.getElementById('botonRegistroMercancia');
let pesoMercancia = document.getElementById('pesomercancia');
let volumenMercancia = document.getElementById('volumenmercancia');
let nombreMercancia = document.getElementById('nombremercancia');
let tipoDestinatarioMercancia = document.getElementById('tipodestinatariomercancia');
let departamentoMercancia = document.getElementById('departamentomercancia');
let ciudadMercancia = document.getElementById('ciudadmercancia');
let nombreDestinatarioMercancia = document.getElementById('nombredestinatariomercancia');
let direccionMercancia = document.getElementById('direccionmercancia');
let fechaIngresoMercancia = document.getElementById('fechaingresomercancia');
let fechaSalidaMercancia = document.getElementById('fechasalidamercancia');
let idBodega = 0;


document.getElementById('bodega').addEventListener('change', function() {
    idBodega = this.value;
    console.log("ID de la bodega seleccionada:", idBodega)
    
});


//detectar evento click en el boton de registro de mercancia

botonRegistroMercancia.addEventListener('click', function(evento) {
    evento.preventDefault();
    let objetoMercancia = {
        peso: pesoMercancia.value,
        volumen: volumenMercancia.value,
        nombre: nombreMercancia.value,
        tipoDestinatario: tipoDestinatarioMercancia.value,
        departamento: departamentoMercancia.value,
        ciudad: ciudadMercancia.value,
        nombreDestinatario: nombreDestinatarioMercancia.value,
        direccion: direccionMercancia.value,
        fechaIngreso: fechaIngresoMercancia.value,
        fechaSalida: fechaSalidaMercancia.value,
        zonaBodega: {
            idZona: idBodega
        }
    }

    //Llmando a la API
    try {
        if (objetoMercancia.peso === "" || objetoMercancia.volumen === "" || objetoMercancia.nombre === "" || objetoMercancia.tipoDestinatario === "" || objetoMercancia.departamento === "" || objetoMercancia.ciudad === "" || objetoMercancia.nombreDestinatario === "" || objetoMercancia.direccion === "" || objetoMercancia.fechaIngreso === "" || objetoMercancia.fechaSalida === "" || objetoMercancia.zonaBodega === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor llene todos los campos!"
            });
            return;
        }
        console.log("Objeto mercancia:", objetoMercancia);
        registrarMercancia(objetoMercancia)
        .then(function(respuesta){
            if(respuesta){
                Swal.fire({
                    title: "Buen trabajo!",
                    text: "Mercancía registrada exitosamente",
                    icon: "success"
                });
            }
        });
    } catch (error) {
        console.log(error)    
    }

});


let filatabla=document.getElementById('filatabla')
consultarMercancias()
.then(function(respuesta){
    if(Array.isArray(respuesta)){
        respuesta.forEach(function(mercancia){
        
            let fila=document.createElement('tr');
    
            let colNombre=document.createElement('td');
            colNombre.textContent=mercancia.nombre;
    
            let colVolumen=document.createElement('td');
            colVolumen.textContent=mercancia.volumen;

            let colPeso=document.createElement('td');
            colPeso.textContent=mercancia.peso;

            let colDireccion=document.createElement('td');
            colDireccion.textContent=mercancia.direccion;

            let colFechaIngreso=document.createElement('td');
            colFechaIngreso.textContent=mercancia.fechaIngreso;

            let colNombreBodega=document.createElement('td');
            colNombreBodega.textContent=mercancia.nombreZona;

            fila.appendChild(colNombre);
            fila.appendChild(colVolumen);
            fila.appendChild(colPeso);
            fila.appendChild(colDireccion);
            fila.appendChild(colFechaIngreso);
            fila.appendChild(colNombreBodega);
            filatabla.appendChild(fila)
    
        });
    }
})




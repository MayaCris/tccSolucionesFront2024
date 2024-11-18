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

//Llamando al servicio de consulta de mercancia
// let fila=document.getElementById('fila')
// consultarMercancias()
// .then(function(respuesta){
//     console.log("La respuesta de mercancía es: ", respuesta)
//     if(Array.isArray(respuesta)){
//         respuesta.forEach(function(mercancia){
        
//             let columna=document.createElement('div');
//             columna.classList.add('col');
    
//             let tarjeta=document.createElement('div');
//             tarjeta.classList.add('card', "h-100", "shadow", "p-5");
            
//             let nombreMercancia=document.createElement('h3');
//             nombreMercancia.textContent=mercancia.nombre;
    
//             let fechaIngresoMercancia=document.createElement('h4');
//             fechaIngresoMercancia.textContent=mercancia.fechaIngreso;

//             tarjeta.appendChild(nombreMercancia);
//             tarjeta.appendChild(fechaIngresoMercancia);
//             columna.appendChild(tarjeta);
//             fila.appendChild(columna)
    
//         });
//     }

// });

let filatabla=document.getElementById('filatabla')
consultarMercancias()
.then(function(respuesta){
    console.log("La respuesta de mercancía es: ", respuesta)
    if(Array.isArray(respuesta)){
        respuesta.forEach(function(mercancia){
        
            let fila=document.createElement('tr');
    
            let columna1=document.createElement('td');
            columna1.textContent=mercancia.nombre;
    
            let columna2=document.createElement('td');
            columna2.textContent=mercancia.volumen;

            let columna3=document.createElement('td');
            columna3.textContent=mercancia.peso;

            let columna4=document.createElement('td');
            columna4.textContent=mercancia.direccion;

            let columna5=document.createElement('td');
            columna5.textContent=mercancia.fechaIngreso;

            let columna6=document.createElement('td');
            columna6.textContent=mercancia.nombreZona;

            fila.appendChild(columna1);
            fila.appendChild(columna2);
            fila.appendChild(columna3);
            fila.appendChild(columna4);
            fila.appendChild(columna5);
            fila.appendChild(columna6);
            filatabla.appendChild(fila)
    
        });
    }
})




export async function consultarBodegas(){
    const URL = "http://localhost:8080/soluciontcc/v1/zonaBodegas";
    let peticion = {
        method: 'GET',
    }
    let respuestaServidor = await fetch(URL, peticion)
    let respuestaFinal = await respuestaServidor.json();
    return respuestaFinal;
}
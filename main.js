const play = document.getElementById("play");
const contenedor = document.getElementById("contenedor");

const renderizar = (contadoPreguntas, contadorCorrectas, yaPreguntados, continente, cantidadPreguntas) => {
    // play.className = "hide";   
    contenedor.innerHTML = "";
    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(datos => {
            let filtrados = datos.filter((item) => item.continents[0] === continente);
            console.log(filtrados);
            // console.log(yaPreguntados)
            // if(!filtrados){
            //     renderizar(contadoPreguntas, contadorCorrectas, yaPreguntados, continente, cantidadPreguntas)
            // }
            let div = document.createElement("div");
            div.classList.add("preguntas")
            let imagen = document.createElement("img");
            let pais = filtrados[Math.round(Math.random() * cantidadPreguntas)];
           
            let verificar = yaPreguntados.some((item) => item.cca3 === pais.cca3);
            if(verificar){
                    while(verificar!=false){
                        pais = filtrados[Math.round(Math.random() * cantidadPreguntas)];
                        verificar = yaPreguntados.some((item) => item.cca3 === pais.cca3);
                        if(!verificar){
                            yaPreguntados.push(pais);
                        }
                    }
            }else{
                yaPreguntados.push(pais);
            }


            imagen.setAttribute("src", pais.flags.png);
            div.innerHTML = `
                <button id="opcion1" class="boton">${filtrados[Math.round(Math.random() * cantidadPreguntas)].name.common}</button>
                <button id="opcion2" class="boton">${pais.name.common}</button>
                <button id="opcion3" class="boton">${filtrados[Math.round(Math.random() * cantidadPreguntas)].name.common}</button>
                <button id="opcion4" class="boton">${filtrados[Math.round(Math.random() * cantidadPreguntas)].name.common}</button>
                <span class="span"> ${contadorCorrectas}/${contadoPreguntas}</span>
            `;

            div.append(imagen);
            contenedor.append(div);

            let boton1 = document.getElementById("opcion1");
            let boton2 = document.getElementById("opcion2");
            let boton3 = document.getElementById("opcion3");
            let boton4 = document.getElementById("opcion4");


            let item = Math.round(Math.random() * 3);
            boton1.classList.add(`posicion${item}`);
            let repetido = item;

            while (item === repetido) {
                item = Math.round(Math.random() * 3);
            }
            boton2.classList.add(`posicion${item}`);
            let repeti2 = item;

            while (item === repetido || item === repeti2) {
                item = Math.round(Math.random() * 3);
            }
            boton3.classList.add(`posicion${item}`);
            let repeti3 = item;

            while (item === repetido || item === repeti2 || item === repeti3) {
                item = Math.round(Math.random() * 3);
            }
            boton4.classList.add(`posicion${item}`);

            boton1.addEventListener("click", () => {
                boton1.classList.add("btn-error");
                boton2.classList.add("btn-correcto");
                setTimeout(() => {
                    contadoPreguntas++;
                    renderizar(contadoPreguntas, contadorCorrectas, yaPreguntados, continente, cantidadPreguntas);
                }, 300);

            });
            boton2.addEventListener("click", () => {
                boton2.classList.add("btn-correcto");
                setTimeout(() => {
                    contadoPreguntas++;
                    contadorCorrectas++;
                    renderizar(contadoPreguntas, contadorCorrectas, yaPreguntados, continente, cantidadPreguntas);
                }, 300);
            });
            boton3.addEventListener("click", () => {
                boton3.classList.add("btn-error");
                boton2.classList.add("btn-correcto");
                setTimeout(() => {
                    contadoPreguntas++;
                    renderizar(contadoPreguntas, contadorCorrectas, yaPreguntados, continente, cantidadPreguntas);
                }, 300);

            });
            boton4.addEventListener("click", () => {
                boton4.classList.add("btn-error");
                boton2.classList.add("btn-correcto");
                setTimeout(() => {
                    contadoPreguntas++;
                    renderizar(contadoPreguntas, contadorCorrectas, yaPreguntados, continente, cantidadPreguntas);
                }, 300);

            });

            if (contadoPreguntas >= cantidadPreguntas) {
                Swal.fire({
                    title: "Juego terminado",
                    text: `conseguiste ${contadorCorrectas} repuestas correctas`,
                    icon: "success"
                });
                setTimeout(() => {
                    contadoPreguntas = 0;
                    contadorCorrectas = 0;
                    location.reload();
                }, 3000);

            }

        })
}
// Oceania
// North America
// Europe
// Asia
// South America 

const namerica = document.getElementById("namerica");
const samerica = document.getElementById("samerica");
const europa = document.getElementById("europa");
const asia = document.getElementById("asia");
const africa = document.getElementById("africa");
const botones = document.getElementById("botones");

namerica.addEventListener("click", ()=>{
    botones.classList.add("hiden");
    renderizar(0, 0, [], "North America", 40);
})

samerica.addEventListener("click", ()=>{
    botones.classList.add("hiden");
    renderizar(0, 0, [], "South America", 13);
})

europa.addEventListener("click", ()=>{
    botones.classList.add("hiden");
    renderizar(0, 0, [], "Europe", 54);
})

asia.addEventListener("click", ()=>{
    botones.classList.add("hiden");
    renderizar(0, 0, [], "Asia", 50);
})

africa.addEventListener("click", ()=>{
    botones.classList.add("hiden");
    renderizar(0, 0, [], "Africa", 58);
})




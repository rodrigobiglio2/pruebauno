const play = document.getElementById("play");
const contenedor = document.getElementById("contenedor");

const renderizar = (contador, contadorCorrectas) => {
    play.className = "hide";
    let counter = contador;
    let counterR = contadorCorrectas;
    contenedor.innerHTML = "";
    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(datos => {
            // let filtradosAsia = datos.filter((item) => item.continents[0] === "Asia");
            let filtradosEuropa = datos.filter((item) => item.continents[0] === "Europe");
            // let filtradosOceania = datos.filter((item) => item.continents[0] === "Europe");
            // let filtradosNA = datos.filter((item) => item.continents[0] === "North America");
            // let filtradosSA = datos.filter((item) => item.continents[0] === "South America");
            // let filtradosAntartica = datos.filter((item) => item.continents[0] === "Antarctica");
            // CREAR UN ARRAY PARA GUARDAR LOS PAISES YA PREGUNTADOS, UNA VEZ TENER ESE ARRAY COMPARARLO CON EL PAIS AL  AZAR EN UN BUCLE Y SI ES REPETIDO VOLVERA TIRAR OTRO PAIS AL AZAR 
            // datos.forEach(item => {
            //     const ccn3 = item.cca3;
            //     console.log(ccn3)
            // });
            console.log(filtradosEuropa)
            let div = document.createElement("div");
            div.classList.add("preguntas")
            let imagen = document.createElement("img");
            let pais = filtradosEuropa[Math.round(Math.random() * 54)];
            imagen.setAttribute("src", pais.flags.png);
            div.innerHTML = `
                <button id="opcion1" class="boton">${filtradosEuropa[Math.round(Math.random() * 54)].name.common}</button>
                <button id="opcion2" class="boton">${pais.name.common}</button>
                <button id="opcion3" class="boton">${filtradosEuropa[Math.round(Math.random() * 54)].name.common}</button>
                <button id="opcion4" class="boton">${filtradosEuropa[Math.round(Math.random() * 54)].name.common}</button>
                <span class="span"> ${counterR}/${counter}</span>
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
                    counter++;
                    renderizar(counter, counterR);
                }, 300);

            });
            boton2.addEventListener("click", () => {
                boton2.classList.add("btn-correcto");
                setTimeout(() => {
                    counter++;
                    counterR++;
                    renderizar(counter, counterR);
                }, 300);
            });
            boton3.addEventListener("click", () => {
                boton3.classList.add("btn-error");
                boton2.classList.add("btn-correcto");
                setTimeout(() => {
                    counter++;
                    renderizar(counter, counterR);
                }, 300);

            });
            boton4.addEventListener("click", () => {
                boton4.classList.add("btn-error");
                boton2.classList.add("btn-correcto");
                setTimeout(() => {
                    counter++;
                    renderizar(counter, counterR);
                }, 300);

            });

            if (counter > 29) {
                Swal.fire({
                    title: "Juego terminado",
                    text: `conseguiste ${counterR} repuestas correctas`,
                    icon: "success"
                });
                setTimeout(() => {
                    counter = 0;
                    counterR = 0;
                    location.reload();
                }, 4000);

            }
        })
}

play.addEventListener("click", () => {
    renderizar(0, 0);
}
)



const saludo = () =>{
    alert("hola");
}

// setTimeout(() => {
//     saludo();
// }, 3000);


const  titular =document.getElementById("titular");
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
    const inputs = e.target.children;
    console.log(inputs[0].children[0].value);
    if (inputs[0].children[0].value === ""){
        titular.innerHTML="Te dije que pongas tu nombre cabeza de pito"
    }else{
        titular.innerHTML='Bienvenido ' + inputs[0].children[0].value;
    }
    titular.classList.add("visible");
})
var Elementos = [];

function cambiarTexto(){
    miTitulo.innerHTML = "He manipulado el texto";
    btnRestaurar.style.display = "block";
}


function cambiarFondo(){
    contenedor.style.backgroundColor = "lightblue";
    btnRestaurar.style.display = "block";
}


function restaurar(){
    miTitulo.innerHTML = "Manipulación del DOM";
    contenedor.style.backgroundColor = "";
}


function agregarElemento(){
    let nuevoElemento = inputNuevoElemento.value;
    if (nuevoElemento !== "") {
        Elementos.push(nuevoElemento);
    } else {
        alert("Por favor, ingresa un texto válido.");
    }

    dvElementos.innerHTML = "";
    Elementos.forEach(function(elemento) {
        let p = document.createElement("p");
        p.textContent = elemento;
        dvElementos.appendChild(p);
    });
}
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
    
    mostrarElementos();
}  

function eliminarElemento(){     
    let indice = parseInt(inputEliminarElemento.value);     
    if (!isNaN(indice) && indice >= 0 && indice < Elementos.length) {         
        Elementos.splice(indice, 1);     
    } else {         
        alert("Por favor, ingresa un número válido.");     
    }      
    
    mostrarElementos();
}

function mostrarElementos() {
    dvElementos.innerHTML = "";     
    Elementos.forEach(function(elemento, indice) {         
        let p = document.createElement("p");         
        p.textContent = `${indice}: ${elemento}`;  
        dvElementos.appendChild(p);     
    }); 
}
document.addEventListener("DOMContentLoaded", () => {

    //CAPTURAR 
    const sumarProducto = document.querySelector("#sumarProducto");
    const listaFinal = document.querySelector(".listaFinal");
    const formulario = document.querySelector("#formulario");
    const inputProducto = document.querySelector("#inputProducto");
    const cuerpoTabla = document.querySelector(".listaFinal tbody");
    //console.log(cuerpoTabla)

    //ARRAY ALMACENAR LOCAL 


    //si no tienen nada se almacena ene un array vacio 

    //EVENTOS 
    formulario.addEventListener("submit", (ev) => {
        ev.preventDefault();
        const nombreProducto = inputProducto.value;
        agregarProducto(nombreProducto);
        formulario.reset();
    });
    listaFinal.addEventListener("click", (ev) => {
        //console.log("eliminar");
        ev.preventDefault();
        const id = ev.target.dataset.id;
        const producto = arrayLocal.find((prod) => prod.id === id);
        eliminarProducto(producto);
    });
    //FUNCIONES
    //leerLocal() = recupera productos 
    //guardarlocal() = garda array actualizado
    //agregarProducto() = busca en el array e incrementa o crea
    //pintarLista() = pistar productos en dom

    const leerLocal = () => {
        const arrayLocal = JSON.parse(localStorage.getItem("producto")) || [];
        return arrayLocal;
    };
    const arrayLocal = leerLocal();
    //-----------------------------------------------
    const guardarLocal = (arrayLocal) => {
        const listaProductos = JSON.stringify(arrayLocal); //hace la lista un string completo
        localStorage.setItem("producto", listaProductos);
        //en productos añadir el string 
        pintarLista(arrayLocal);
    };
    //------------------------------------------
    const pintarLista = (arrayLocal) => {
        cuerpoTabla.innerHTML = "";
        arrayLocal.forEach((productos) => {
            /* const elemento = document.createElement("LI");
             elemento.textContent= productos.nombre;
             const cantidad = document.createElement("P");
             cantidad.textContent= productos.cantidad;
             elemento.append(cantidad);
             listaFinal.appendChild(elemento);*/
            const fila = document.createElement("tr");
            const columnaProducto = document.createElement("td");
            const columnaCantidad = document.createElement("td");
            const columnaEliminar = document.createElement("td");
            const botonEliminar = document.createElement("button");

            columnaProducto.textContent = productos.nombre;
            columnaCantidad.textContent = productos.cantidad;
            botonEliminar.textContent = "Eliminar";
            botonEliminar.dataset.id = productos.id; //captura el id del producto con el ev click 

            columnaEliminar.appendChild(botonEliminar);
            fila.append(columnaProducto, columnaCantidad, columnaEliminar);
            cuerpoTabla.appendChild(fila);   
        });
    };
    //-------------------------------------------------------
    //recoger dato de fomulario 
    const agregarProducto = (nombreProducto) => {
        const existente = arrayLocal.find((producto) =>
            (producto.nombre === nombreProducto));

        if (existente) {
            existente.cantidad = existente.cantidad + 1;

        } else arrayLocal.push({
            id: nombreProducto,
            cantidad: 1,
            nombre: nombreProducto,
        });
        guardarLocal(arrayLocal);
    };

    pintarLista(arrayLocal);
    //------------------------------------------------
    const eliminarProducto = (producto) => {
        if (producto.cantidad > 1) {
            producto.cantidad -= 1;
        }else{
            const indice =arrayLocal.indexOf(producto); //buscar en el array
            if (indice !== -1) {
                arrayLocal.splice(indice, 1)
            };
    pintarLista(arrayLocal);
    };
    };
}); //FIN - DOMContentLoaded

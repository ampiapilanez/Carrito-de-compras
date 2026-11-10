document.addEventListener("DOMContentLoaded", () => {

    //CAPTURAR 
    const sumarProducto = document.querySelector("#sumarProducto");
    const listaFinal = document.querySelector(".listaFinal");
    const formulario = document.querySelector("#formulario");
    const inputProducto = document.querySelector("#inputProducto");
    const cuerpoTabla = document.querySelector(".listaFinal tbody");
    //console.log(cuerpoTabla)
    const fragment= document.createDocumentFragment();

    //ARRAY ALMACENAR LOCAL 


    //si no tienen nada se almacena ene un array vacio 

    //EVENTOS 
    formulario.addEventListener("submit", (ev) => {
        ev.preventDefault();
        const nombreProducto = inputProducto.value;
        agregarProducto(nombreProducto);
        pintarLista();
        formulario.reset();
    });
    listaFinal.addEventListener("click", (ev) => {
        //console.log("eliminar");
        ev.preventDefault();
        const id = ev.target.dataset.id;
        //const producto = arrayLocal.find(()=>)
        eliminarProducto(id);
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
    //const arrayLocal = leerLocal();
    //-----------------------------------------------
    const guardarLocal = (arrayLocal) => {
        const listaProductos = JSON.stringify(arrayLocal); //hace la lista un string completo
        
        localStorage.setItem("producto", listaProductos);
        //en productos añadir el string 
        //pintarLista(arrayLocal);
    };
    //------------------------------------------
    const pintarLista = () => {
        cuerpoTabla.innerHTML = "";
        const arrayLocal= leerLocal();
        arrayLocal.forEach(({nombre, cantidad, id}) => {
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

            columnaProducto.textContent = nombre;
            columnaCantidad.textContent = cantidad;
            botonEliminar.textContent = "Eliminar";
            botonEliminar.dataset.id = id; //captura el id del producto con el ev click 

            columnaEliminar.appendChild(botonEliminar);
            fila.append(columnaProducto, columnaCantidad, columnaEliminar);
        
            fragment.append(fila);
        });
        cuerpoTabla.appendChild(fragment);
    };
    //-------------------------------------------------------
    //recoger dato de fomulario 
    const agregarProducto = (nombreProducto) => {
        const arrayLocal= leerLocal();
        console.log(arrayLocal);
        let nuevoArray;
        const existente = arrayLocal.find((producto) => {
            console.log(producto);
        return producto.nombre.toLowerCase() === nombreProducto.toLowerCase() 
        });

            console.log(existente, " en agregar producto")
            if (!existente) return;
        if (existente) {
            existente.cantidad = existente.cantidad + 1;

        } else {
           const nuevoProducto= {
            id: nombreProducto,
            cantidad: 1,
            nombre: nombreProducto,
            };
            nuevoArray = [ 
                ...arrayLocal,
                nuevoProducto
            ]
            
        };
       guardarLocal(nuevoArray);
    };

    //------------------------------------------------
    const eliminarProducto = (id) => {
        const arrayLocal = leerLocal();
        const existente = arrayLocal.find((producto)=>producto.id === id);
        let arrayNuevo;
        //!existente && return;
        if (!existente) return;

        if (existente.cantidad > 1) {
            existente.cantidad -= 1;
        } else {
            /*const indice = arrayLocal.indexOf(existente); //buscar en el array
            if (indice !== -1) {
                arrayLocal.splice(indice, 1)
            };*/
            arrayNuevo= arrayLocal.filter((producto)=>producto.id !== id);
            pintarLista(arrayNuevo);
        };
        pintarLista(arrayLocal);
    };
pintarLista();
}); //FIN - DOMContentLoaded

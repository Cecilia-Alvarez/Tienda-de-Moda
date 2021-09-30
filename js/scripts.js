class Producto {

    constructor (id, title, price, category, img){
        this.id = id;
        this.title = title;
        this.price = price;
        this.category =category;
        this.img = img;
    }
}

const producto_uno = new Producto(1, "Pantalón Daniela", 2500, "Pantalones", 'img/pantalon.jpg');
const producto_dos = new Producto(2, "Vestido Florencia", 4000, "Vestidos", 'img/vestido-florencia.jpg');
const producto_tres = new Producto(3, "Top Mariela", 2000, "Tops", 'img/top-mariela.webp');
const producto_cuatro = new Producto(4, "Top Malena", 2500, "Tops", 'img/top-malena.jpg');
const producto_cinco = new Producto(5, "Vestido Sabrina", 4500, "Vestidos", 'img/vestido-sabrina.jpg');

const baseDeDatos = [producto_uno, producto_dos, producto_tres, producto_cuatro, producto_cinco];
const carrito = [];

displayProducts('default');

function guardar() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

let acumulador = ``;
baseDeDatos.forEach((producto) => {
    acumulador += `<div class="col mb-5" id="${producto.title}">
    <div class="card h-100">
        <!-- Product image-->
        <img class="card-img-top" src="${producto.img}"..." />
        <!-- Product details-->
        <div class="card-body p-4">
            <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">${producto.title}</h5>
                <!-- Product price-->
                $${producto.price}
            </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#" onclick="agregar(${producto.id})">Comprar</a></div>
        </div>
    </div>
    </div>`
});

document.querySelector("#productos").innerHTML = acumulador;


function displayResults(){
    let productosComprados = JSON.parse(localStorage.getItem('carrito'));

    let acumulador = ``;
    productosComprados.forEach((producto) =>{
    acumulador += `<div class="col mb-5" id="${producto.title}">
    <div class="card h-100">
        <!-- Product image-->
        <img class="card-img-top" src="${producto.img}"..." />
        <!-- Product details-->
        <div class="card-body p-4">
            <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">${producto.title}</h5>
                <!-- Product price-->
                $${producto.price}
            </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
           <h4>¡Excelente compra!</h5>
        </div>
    </div>
    </div>`
})
    document.getElementById("resultados").innerHTML = acumulador;
};
   

function agregar(id){
    const productoEncontrado = baseDeDatos.find(producto => producto.id === id);
    if(productoEncontrado !== undefined){ 
        carrito.push(productoEncontrado);
        console.log(carrito)
        guardar();
        displayResults()
        document.getElementById("contadorCarrito").innerHTML = carrito.length;
    }
};

function displayProducts(filtro){

    let productosFiltrados = (filtro !== "default") ? 
    baseDeDatos.filter(producto => producto.category == filtro) : 
    baseDeDatos;

    let acumulador = ``;
    productosFiltrados.forEach((producto) =>{
    acumulador += `<div class="col mb-5" id="${producto.title}">
    <div class="card h-100">
        <!-- Product image-->
        <img class="card-img-top" src="${producto.img}"..." />
        <!-- Product details-->
        <div class="card-body p-4">
            <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">${producto.title}</h5>
                <!-- Product price-->
                $${producto.price}
            </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#" onclick="agregar(${producto.id})">Comprar</a></div>
        </div>
    </div>
    </div>`
})
    document.getElementById("productos").innerHTML = acumulador;
};

// Ventana Carrito
let modal = document.getElementById("myModal");

let btn = document.getElementById("myBtn");

let span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

let mostrar=``;

fetch("banner.json")
.then(response=>response.json())
.then(data=>{
    data.forEach(element =>{
        mostrar += `<img src="${element.img}" class="img-fluid" alt="Responsive image">`
    });
document.getElementById("banner").innerHTML = mostrar;
})






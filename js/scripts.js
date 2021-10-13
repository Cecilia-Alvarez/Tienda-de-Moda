class Producto {

    constructor (id, title, price, category, count, img){
        this.id = id;
        this.title = title;
        this.price = price;
        this.category =category;
        this.count = count;
        this.img = img;
    }
}

const producto_uno = new Producto(1, "Pantalón Daniela", 2500, "Pantalones", 1, 'img/pantalon.jpg');
const producto_dos = new Producto(2, "Vestido Florencia", 4000, "Vestidos", 1, 'img/vestido-florencia.jpg');
const producto_tres = new Producto(3, "Top Mariela", 2000, "Tops", 1, 'img/top-mariela.webp');
const producto_cuatro = new Producto(4, "Top Malena", 2500, "Tops", 1, 'img/top-malena.jpg');
const producto_cinco = new Producto(5, "Vestido Sabrina", 4500, "Vestidos", 1, 'img/vestido-sabrina.jpg');
const producto_seis = new Producto(6, "Pantalón Delfina", 3500, "Pantalones", 1, 'img/pantalon-Delfina.jfif');
const producto_siete = new Producto(7, "Pantalón Carolina", 3000, "Pantalones", 1, 'img/pantalon-carolina.jfif');
const producto_ocho = new Producto(8, "Top Melina", 2500, "Tops", 1, 'img/top-melina.jfif');

const baseDeDatos = [producto_uno, producto_dos, producto_tres, producto_cuatro, producto_cinco, producto_seis, producto_siete, producto_ocho];
const carrito = [];

const productosComprados = JSON.parse(localStorage.getItem('carrito'));

const parentElement = document.querySelector('#resultados');

// Recuperar carrito del Local Storage cuando se recarga la Web

document.addEventListener('DOMContentLoaded', e => {
    let productosComprados = JSON.parse(localStorage.getItem('carrito'));
if (productosComprados.length > 0) {
        displayResults();
        document.getElementById("contadorCarrito").innerHTML = carrito.length;
    };
});

// Agregar al Carrito y al Local Storage

function agregar(id){
    const productoEncontrado = baseDeDatos.find(producto => producto.id === id);
    if(productoEncontrado !== undefined){ 
        carrito.push(productoEncontrado);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        displayResults();
        document.getElementById("contadorCarrito").innerHTML = carrito.length;
    };
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

// Vaciar Carrito

function vaciar() {
   localStorage.clear();
   let carrito = JSON.parse(localStorage.getItem('carrito'))
   document.querySelector("#items").innerHTML = ``;
   document.querySelector("#precioTotal").innerHTML = `Total: $0`;
   document.getElementById("contadorCarrito").innerHTML = carrito.length;
};


// Calcular Costo

function costoTotal(){
    let productosComprados = JSON.parse(localStorage.getItem('carrito'));
    const precios = productosComprados;
    const totalPrice = precios.reduce((sum, value) => (typeof value.price == "number" ? sum + value.price : sum), 0);
    document.querySelector("#precioTotal").innerHTML = `Total: $`+totalPrice;
};

// Mostrar Productos en Carrito

function displayResults(){
    let productosComprados = JSON.parse(localStorage.getItem('carrito'));
if (productosComprados !== undefined) {
    let resultado = productosComprados.map(producto => {
        return `<tr class="productoCarrito">
        <td scope="row">${producto.title}</td>
        <td><span class="shoppingCartItemPrice">${producto.count}</span></td>
        <td>$ <span>${producto.price}</span></td>
        </tr>`
    });
    document.querySelector("#items").innerHTML = resultado;
};
costoTotal();
};

// Banner de Flores

let mostrar=``;

fetch("banner.json")
.then(response=>response.json())
.then(data=>{
    data.forEach(element =>{
        mostrar += `<img src="${element.img}" class="img-fluid" alt="Responsive image">`
    });
document.getElementById("banner").innerHTML = mostrar;
})

// Mostrar Cards de Productos con o sin filtros

displayProducts('default');

let acumulador = ``;
baseDeDatos.forEach((producto) => {
    acumulador += `<div class=item>
    <div class="col mb-5" class="itemTitle" id="${producto.title}">
    <div class="card h-100">
        <!-- Product image-->
        <img class="card-img-top" src="${producto.img}"..." />
        <!-- Product details-->
        <div class="card-body p-4">
            <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">${producto.title}</h5>
                <p class="shoppingCartItemPrice">
                <!-- Product price-->
                $${producto.price}
                </p>
            </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
           <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#" onclick="agregar(${producto.id})">Comprar</a>
            </div>
        </div>
    </div>
    </div>
    </div>`
});

document.querySelector("#productos").innerHTML = acumulador;

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
                <p class="item-price">
                <!-- Product price-->
                $${producto.price}
                </p>
            </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#" onclick="agregar(${producto.id})">Comprar</a></div>
        </div>
    </div>
    </div>`
});
    document.getElementById("productos").innerHTML = acumulador;
};
class Producto {

    constructor (id, title, price, category, img){
        this.id = id;
        this.title = title;
        this.price = price;
        this.category =category;
        this.img = img;
    }
}

const producto_uno = new Producto(1, "Pantalón Daniela", 2500, "Pantalones", 'https://datalatienda.com/8398-thickbox_default/pantalon-cargo-con-puno-dama-embrujo-5224.jpg');
const producto_dos = new Producto(2, "Vestido Florencia", 4000, "Vestidos", 'https://http2.mlstatic.com/D_NQ_NP_822811-MLA31095910641_062019-W.jpg');
const producto_tres = new Producto(3, "Top Mariela", 2000, "Tops", 'https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/productimage/2020/9/22/7e999732-a4ad-4464-9d57-5e0bd60a270c1600728478352-1.jpg');
const producto_cuatro = new Producto(4, "Top Malena", 2500, "Tops", 'https://m.media-amazon.com/images/I/61q4GZdyofL._AC_UL320_.jpg');
const producto_cinco = new Producto(5, "Vestido Sabrina", 4500, "Vestidos", 'https://www.laprensa.hn/csp/mediapool/sites/dt.common.streams.StreamServer.cls?STREAMOID=Iaek9OOWHkF4qu$eHQf5as$daE2N3K4ZzOUsqbU5sYvGJonhL_UnsX3udqWupQY16FB40xiOfUoExWL3M40tfzssyZqpeG_J0TFo7ZhRaDiHC9oxmioMlYVJD0A$3RbIiibgT65kY_CSDiCiUzvHvODrHApbd6ry6YGl5GGOZrs-&CONTENTTYPE=image/jpeg');

const baseDeDatos = [producto_uno, producto_dos, producto_tres, producto_cuatro, producto_cinco];
const carrito = [];

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


    document.getElementById("productos").innerHTML = acumulador;


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
}




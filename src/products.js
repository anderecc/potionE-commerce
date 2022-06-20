const $ligthbox = document.querySelector('.product-lightbox');
const $products = document.querySelector('.products');
const $productsLightbox = document.querySelector('.product-ligthbox-container');

let cart = [];
let data = [];

const closeLightbox = () =>{
    $ligthbox.style.display = 'none';
};
const mais = () =>{
    let $inputValue = document.getElementById("total").value;
    let novo = $inputValue - (-1); 
    document.getElementById("total").value = novo;
};  
const menos = () =>{
    let $inputValue = document.getElementById("total").value;
    if($inputValue > 1) { 
        let novo = $inputValue - 1;
        document.getElementById("total").value = novo;
    };
};

const setItemLocalStorage = (i) => {
    const items = JSON.parse(localStorage.getItem('listCartPotions'));
    let potion = data[i];
    let item = [];
    let newsItems = [];
    let quantidade = 0;
    let $inputValue = document.getElementById("total").value;
    for (let ind = 0; ind < $inputValue; ind++) {
        item.push(potion) 
    }

    if(!items) {
        localStorage.setItem('listCartPotions', JSON.stringify(item));
        quantidade = $inputValue;
    } else {
        newsItems = [...items, ...item];
        localStorage.setItem('listCartPotions', JSON.stringify(newsItems));
        items.length === 0 ? quantidade = 1 : quantidade = parseInt(items.length) + parseInt($inputValue);
    }
    addQtdInCart(quantidade);


}

const addToCart = (i) => {
    setItemLocalStorage(i);
}


(async function resolveData() {
    // usando dados do json
    await fetch('./src/potions.json')
    .then(response => response.json())
    .then(res => data.push(...res));
    data.forEach(potion => {
        let htmlProducts = `
        <div class="item">
            <img value="${potion.id}" src="./assets/products/${potion.image}" alt="${potion.name}">
            <p>${potion.name}: <span>${potion.price}</span></p>
        </div>
        `;
        $products.innerHTML += htmlProducts;
    });
    addQtdInCart()
})();



function openLightbox(i) {
    $ligthbox.style.display = 'flex'
    let ingredient = '';
    data[i].ingredients.forEach(ingre => {
        ingredient += `<li>${ingre}</li>`;
        return ingredient
    })

    let htmlLightbox = `
    <button class="product-btn-close"><i class="fa-solid fa-rectangle-xmark"></i></button>
    <img src="./assets/products/${data[i].image}" alt="${data[i].name}">
    <div class="product-info-container">
        <h2 class="product-name">${data[i].name}</h2>
        <p class="product-info">Use/Effect: </p>
        <p class="product-effect">${data[i].effect}</p>
        <p class="product-info">Ingredients: </p>
        <ul class="product-ingredients">
            ${ingredient}
        </ul>
        <p class="product-info">Price: </p>
        <p class="product-price">${data[i].price}</p>
        <div class="product-add-container">
            <button onClick="addToCart(${data[i].id - 1})" class="product-btn-add">Add to cart</button>
            <div class="product-input-container">
                <button onclick="menos()" class="btn-a">-</button>
                <input class="input-add" value="1" min=1 id="total" type="number">
                <button onclick="mais()" class="btn-b">+</button>
            </div>
        </div>
    </div>
    `;
    $productsLightbox.innerHTML = htmlLightbox;

}

$products.addEventListener('click', e => {
    const el = e.target;
    if(el.tagName.toLowerCase() == 'img'){
        const i = +el.getAttribute('value') - 1;
        const elName = el.getAttribute('alt');
        if(elName == data[i].name){
            openLightbox(i);
        }    
    }
});

document.addEventListener('click', (e) => {
    const el = e.target;
    if(el.classList.contains('product-btn-close') || el.classList.contains('fa-rectangle-xmark')){
        closeLightbox();
    } ;
});














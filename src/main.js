const $header = document.querySelector('.header')
const $headerNav = document.querySelector('.header-nav')
const $headerLogo = document.querySelector('.header-logo')
const $headerCart = document.querySelector('.header-cart')
const $headerSearch = document.querySelector('.header-search-container')
const $headerPromo = document.querySelector('.promotion-info')
const $btnOpen = document.querySelector('.header-btn-open')
const $btnClose = document.querySelector('.header-btn-close')
const $searchInput = document.querySelector('.header-search-input');
const $suggestions = document.querySelector('.header-suggestions');
const $main = document.querySelector('.main');
const headerHeight = $header.clientHeight;
const promoHeight = $headerPromo.clientHeight;


const qntItems = JSON.parse(localStorage.getItem('listCartPotions')) ? JSON.parse(localStorage.getItem('listCartPotions')).length : '0';
const addQtdInCart = async (quantidade = qntItems) =>{
    let htmlCart = `
    <a href="./cart.html"><i class="fa-solid fa-basket-shopping"></i></a>
    <p class="cart-qtd">${quantidade}</p>
    `;
    $headerCart.innerHTML = htmlCart;
}


const items = [];

fetch('./src/potions.json')
.then(blob => blob.json())
.then(data => items.push(...data))

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {

    const regex = new RegExp(wordToMatch, 'gi')
    return place.name.match(regex)
    })
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function displayMatches() {
    const matchArray = findMatches(this.value, items);
    const htmlSuggestions = matchArray.map(item => {
        if(this.value.length === 0){
            return ``;
        } else {
            const regex = new RegExp(this.value, 'gi');
            const itemName = item.name.replace(' ', '-')
            const getName = itemName.replace(regex, `<span class='h1'>${this.value}</span>`);
            return `
            <li>
                <a href="./index.html">
                    <span>
                        <img src="./assets/products/${item.image}" alt="${item.name}">
                    </span>
                    <span>Name: <span class="suggestions-info">${getName}</span></span>
                    <span>Price: <span class="suggestions-info">${item.price}</span></span>
                </a>
            </li>  
            `;
        }
    }).join('');
    $suggestions.innerHTML = htmlSuggestions
}


$searchInput.addEventListener('change', displayMatches);
$searchInput.addEventListener('keyup', displayMatches);





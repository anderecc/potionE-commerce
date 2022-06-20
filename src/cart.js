const carregaItems = (items) => {
    const $cartItems = document.querySelector('.cart-items-container');
    if(!items || items.length == 0){
        let cartEmpty =`
        <p class="cart-empty">Empty cart, add items.</p>
        `;
        $cartItems.innerHTML = cartEmpty;
    } else {
        $cartItems.innerHTML = '';
        items.forEach(async (potion, i) => {    
            let htmlProducts = `
            <div class="item-cart">
            <p class="cart-item-name">${potion.name}</p>
            <div class="item-cart-container">
            <img src="./assets/products/${potion.image}" alt="${potion.name}">
            <p class="cart-item-price">Price: <span>${potion.price}</span></p>
            <p class="cart-item-price-total">Total: <span>${potion.price}</span></p>
            <button onclick="removeItem(${i})">X</button>
            </div>
            `;
            $cartItems.innerHTML += htmlProducts;
        })
    }
};
const removeItem = (i) =>{
    const items = JSON.parse(localStorage.getItem('listCartPotions'));
    const newsItems = [...items];
    newsItems.splice(i, 1);
    localStorage.setItem('listCartPotions', JSON.stringify(newsItems));
    let quantidade = parseInt(items.length -1);
    addQtdInCart(quantidade);
    carregaItems(newsItems);
}

(async function itemsCart() {
    const items = JSON.parse(localStorage.getItem('listCartPotions'));
    carregaItems(items);
    addQtdInCart()
})();
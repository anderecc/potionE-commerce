
const headerDesktop = (headerHeight, navHeight) => {
    $headerLogo.removeAttribute('style');
    $headerCart.removeAttribute('style');
    $headerSearch.removeAttribute('style');
    $headerNav.style.top = `${headerHeight}px`;
    $suggestions.style.top = `${headerHeight}px`;
    $suggestions.style.display = `block`;
    $suggestions.innerHTML = '';
    $searchInput.value = '';
    $main.style.marginTop = `${navHeight}px`
      
}

const headerMobile = (headerHeight, promoHeight) => {
    $suggestions.style.display = `none`;
    $suggestions.style.top = `${headerHeight + promoHeight}px`;
    $headerNav.style.top = `-100vh`;
    $main.style.marginTop = `${promoHeight}px`


}

const openMenu = () => {
    
    $headerNav.style.top = `${headerHeight + promoHeight}px`;
    $headerLogo.style.display = 'none';
    $headerCart.style.display = 'none';
    $headerSearch.style.display = 'flex';
    $suggestions.style.display = 'block';
    $suggestions.style.top = `${headerHeight + promoHeight}px`;
    $suggestions.innerHTML = '';
    $searchInput.value = '';
    
    $btnClose.style.transform = 'scale(1) rotate(90deg)';
    $btnOpen.style.transform = 'scale(0)';
};
const closeMenu = () => {
    $headerNav.style.top = `-100vh`;
    $headerLogo.style.display = 'block';
    $headerCart.style.display = 'flex';
    $headerSearch.removeAttribute('style');
    $suggestions.style.display = 'none';
    
    $btnOpen.style.transform = 'scale(1)'
    $btnClose.style.transform = 'scale(0) rotate(0deg)'
};

document.addEventListener('click', (e) => {
    const el = e.target;
    if(el.classList.contains('header-btn-close') || el.classList.contains('fa-xmark')){
        closeMenu();
    } else if(el.classList.contains('header-btn-open') || el.classList.contains('fa-bars')){
        openMenu();
    }
});

(function (){
    let headerHeight = $header.clientHeight;
    let navHeight = $headerNav.clientHeight;
    let promoHeight = $headerPromo.clientHeight;

    if(window.innerWidth > 482){
        headerDesktop(headerHeight, navHeight);
    } else if(window.innerWidth <= 482){
        closeMenu();
        headerMobile(headerHeight, promoHeight);
    } 
    
})();

window.addEventListener('resize', e =>{
    let headerHeight = $header.clientHeight;
    let navHeight = $headerNav.clientHeight;
    let promoHeight = $headerPromo.clientHeight;

    if(window.innerWidth > 482){
        headerDesktop(headerHeight, navHeight);
    } else if(window.innerWidth <= 482){
        headerMobile(headerHeight, promoHeight);
        closeMenu();
    }

});





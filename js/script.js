const doc = document;
const productsEl = doc.querySelector('.products');
const cartEl = doc.querySelector('.cart');
const cartCountEl = doc.querySelector('.cart__count');
const fancyBoxWindow = doc.querySelector('.fancyBoxWindow');
const fancyBox = doc.querySelector('.fancyBox');
const fancyBoxClose = doc.querySelector('.fancyBoxClose');
const cartProdList = {
    length: 0,
};

let cartCount = cartProdList.length;
// --------------------------------------

cartCountEl.innerText = cartCount != 0 ? `(${cartCount})` : ' EMPTY';
cartEl.onclick = showCart;



renderProducts(productsEl, products);
const productImgBlock = doc.querySelectorAll('.product__img');

productImgBlock.forEach(function(imgProd) {
    imgProd.onclick = function() {
        const img = this.innerHTML;
        fancyBox.innerHTML = img;
        fancyBoxWindow.style.display = 'flex';
    }
});



fancyBoxClose.onclick = function() {
    fancyBoxWindow.style.display = 'none';
} 





// FUNCTIONS -----------------------------
function renderProducts(parent, productList) {
    for (let product of productList) {
        renderProduct(parent, product);
    }


}

function renderProduct(parent, prodObj) {
    const product = doc.createElement('div');

    const productImgBlock = doc.createElement('div');
    const productImg = doc.createElement('img');

    const productTitle = doc.createElement('h3');

    const productPriceBlock = doc.createElement('div');
    const productPrice = doc.createElement('span');
    const addCartBtn = doc.createElement('button');

    product.className = 'product';
    product.dataset.id = prodObj.id;

    productImgBlock.className = 'product__img';
    productImg.setAttribute('src', `${IMG_PATH}/${prodObj.img}`);
    productImgBlock.append(productImg);

    productTitle.className = 'product__title';
    productTitle.innerText = prodObj.title;

    productPriceBlock.className = 'product__price-block';
    productPrice.className = 'product__price';
    productPrice.innerText = prodObj.price;
    addCartBtn.className = 'add-cart';
    addCartBtn.innerText = 'add to cart';
    addCartBtn.onclick = addProdToCart;
    productPriceBlock.append(productPrice, addCartBtn);

    product.append(
        productImgBlock,
        productTitle,
        productPriceBlock
    );

    parent.append(product);


}

function addProdToCart(e) {
    const id = e.target.closest('.product').dataset.id;

    !cartProdList[id] ? cartProdList[id] = 1 : cartProdList[id] ++;

    cartProdList.length ++;
    cartCount = cartProdList.length;
    cartCountEl.innerText = `(${cartCount})`;
}

function showCart() {
    const cartPopup = doc.createElement('div');
    const cartPopupContentBlock = doc.createElement('div');
    const cartPopupContent = doc.createElement('div');

    cartPopup.className = 'cart-popup';

    cartPopupContentBlock.className = 'cart-popup__content-block';
    cartPopupContent.className = 'cart-popup__content';
    cartPopupContent.innerHTML = `
        <div class="cart-prod-list-header">
            <span class="cart-prod-list-header__item cart-item-number">№</span>
            <span class="cart-prod-list-header__item cart-item-title">Title</span>
            <span class="cart-prod-list-header__item cart-item-count">Count</span>
            <span class="cart-prod-list-header__item cart-item-price">Price</span>
            <span class="cart-prod-list-header__item cart-item-total">Total</span>
            <span class="cart-prod-list-header__item cart-item-title">Photo</span>
        </div>
    `;

    cartPopupContentBlock.append(cartPopupContent);
    renderCloseBtn(cartPopupContentBlock, '.cart-popup');
    cartPopup.append(cartPopupContentBlock);

    renderCartProductList(cartProdList, cartPopupContent);

    doc.body.append(cartPopup);
}

function renderCartProductList(prodList, parent) {
    const cartProdListEl = doc.createElement('ul');
    let cartProdEl = '';
    let number = 1;
    let delBtn;

    for (let key in prodList) {
        if (key == 'length') {
            continue;
        }

        const prodCount = prodList[key];
        const prod = products.find(function(item) {
            return item.id == key;
        });
        const prodTotal = prodCount * prod.price;
        cartProdEl += `
            <li class="cart-prod">
            <div class="cart-prod__info">
                    <span class="cart-prod__item cart-item-number">${number}</span>
                    <span class="cart-prod__item cart-item-title">${prod.title}</span>
                    <span class="cart-prod__item cart-item-count">${prodCount}</span>
                    <span class="cart-prod__item cart-item-price">${prod.price}</span>
                    <span class="cart-prod__item cart-item-total">${prodTotal}</span>
                    <span class="cart-prod__item cart-item-img"><img src="${IMG_PATH}/${prod.img}"></span>
                    <span  class="cart-prod__item cart-item-del">Delete</span>
                </div>
            </li>
        `;

        cartProdListEl.className = 'cart-prod-list';
        cartProdListEl.innerHTML = cartProdEl;

        parent.append(cartProdListEl);

        number ++;

    }


    delBtn = parent.querySelectorAll('.cart-item-del');
    delBtn.forEach(function(item) {
        item.onclick = function(e) {
            e.stopPropagation();
            this.parentElement.remove()
            console.log(cartProdList);
            console.log(this);
        }
    });

}

function removeFromCart(cart, id) {
    cart.splice(cart[id], 1);
    renderCartProductList(cartProdList, cartPopupContent);
    console.log(cart);
  };

function closeCart() {}

function renderCloseBtn(parent, closeParentSelector) {
    const closeBtn = doc.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '&#x2715';
    parent.append(closeBtn);
    closeBtn.onclick = function() {
        const closeEl = this.closest(closeParentSelector);
        closeEl.remove();
    }
}

/*
cartProdEls = {
    1: 5,
    2: 3,
    3: 8,
    count: 16
};

*/
let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Air Jordan 1 Retro',
        tag: 'airJordan',
        price: 100,
        inCart: 0
    },
    {
        name: 'Nike Air Max Bliss',
        tag: 'nikeAirMax',
        price: 80,
        inCart: 0
    },
    {
        name: 'Nike Air Max BW',
        tag: 'nikeAirMaxBW',
        price: 105,
        inCart: 0
    },
    {
        name: 'Nike Air Max 90 SE',
        tag: 'nikeAirMaxSE',
        price: 75,
        inCart: 0
    },
    {
        name: 'Nike Pegasus Turbo Next Nature',
        tag: 'nikePegasus',
        price: 72,
        inCart: 0
    },
    {
        name: 'Nike Air Max 270',
        tag: 'nikeAirMax270',
        price: 95,
        inCart: 0
    },
    {
        name: 'Jordan 3 Retro',
        tag: 'jordan',
        price: 55,
        inCart: 0
    }
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;

    }
}

function cartNumbers(products) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;

    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(products);

}
function setItems(products) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    console.log("items are", cartItems);

    if (cartItems != null) {

        if (cartItems[products.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [products.tag]: products
            }
        }
        cartItems[products.tag].inCart += 1;
    } else {
        products.inCart = 1;
        cartItems = {
            [products.tag]: products
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem('totalCost', product.price);
    }
}
function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products-container");

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class ="product">
            <ion-icon name="close-circle-outline"></ion-icon>
            <img src="${item.tag}.png"
            <span> ${item.name} M/span>
            </div>
            `;

        })
    }
}

onLoadCartNumbers();
displayCart();
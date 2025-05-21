import { items } from "../data/products.js"
import { cart, addIterm, updateCart }  from "../data/cart.js"
import { moneyConveter } from "./utils/money.js"

let itemsStr = ''
document.querySelector('.cart-p1').textContent = updateCart()
let search = new URL(window.location.href).searchParams.get('search')

if(search){
    search = search.toLowerCase()
}

items.forEach((item) => {
    if(item.name.toLowerCase() === search || !search || item.keywords.includes(search)){
    itemsStr += `<div class="item-container">
                
                <div class="img-container">
                <img src="${item.image}" alt="${item.name}" class="item-img">
                </div>

                <p class="item-name">${item.name}</p>

                <div class="rating-info">
                <img src="images/ratings/rating-${item.rating.stars*10}.png" alt="rating" class="rating">
                <span class="count">${item.rating.count}</span>
                </div>

                <p class="price">$${moneyConveter(item.priceCents)}</p>

                <select class="quantity quantity-${item.id}">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>

                <div class="added-to-cart added-to-cart-${item.id}"><img src="images/icons/checkmark.png" alt="checkmark">Added</div>
                
                <button class="add-to-cart-btn"  data-item-id='${item.id}'>Add to Cart</button>
            </div>`
    }
})

document.querySelector('.items-container').innerHTML = itemsStr

document.querySelectorAll('.add-to-cart-btn').forEach((button) => {
    button.addEventListener('click', () => {
    addIterm(button)
    document.querySelector('.cart-p1').textContent = updateCart()
})
})

document.querySelector('.search-icon').addEventListener('click', () => {
    document.querySelector('.search-bar').value

    if(document.querySelector('.search-bar').value){
        window.location = `index.html?search=${document.querySelector('.search-bar').value}`
    }
})

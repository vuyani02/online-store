import { updateCart } from "../data/cart.js"
import { orders } from "../data/ordersdata.js"
import { getItem } from "../data/products.js"

let gaugeLevel
function renderPage(){
    document.querySelector('.cart-p1').textContent = updateCart()
    let quantity = 0
    let arrivalDate = 0
    const url = new URL(window.location.href)
    for(let i = 0; i < orders.length; i++){
        if(orders[i].id === url.searchParams.get('orderId')){
            for(let j = 0; j < orders[i].items.length; j++){
                if(orders[i].items[j].id === url.searchParams.get('itemId')){
                    quantity = orders[i].items[j].quantity
                    arrivalDate = orders[i].items[j].arrivalDate
                    break
                }
            }
            break
        }
    }
    let item = getItem(url.searchParams.get('itemId'))
    const html= `
        <p class="date">Arriving on <time datetime="06-13">${arrivalDate}</time></p>
                    <p class="name">${item.name}</p>
                    <p>Quantity: ${quantity}</p>
                    <img src="${item.image}" alt="socks">
                    <div class="stages">
                        <p>Preparing</p>
                        <p>Shipped</p>
                        <p>Delivered</p>
                    </div>
                    <div class="gauge-container">
                        <div class="gauge" ${gaugeLevel}></div>
                    </div>`
    document.querySelector('.item-tracker').innerHTML = html               
}

renderPage()


function gaugeGenerator(){
    let increment =  0
    
    let id 
    id = setInterval(() => {
        increment += 1
        gaugeLevel = `style="width: ${increment}%"`
        renderPage()
    }, 300)

    setTimeout(() => {
        clearInterval(id)
    }, 30000)
}

gaugeGenerator() 
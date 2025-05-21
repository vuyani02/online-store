import { updateCart, cart, clearCart } from "../data/cart.js"
import { orders, updateOrders } from "../data/ordersdata.js"
import { getItem } from "../data/products.js"
import { moneyConveter } from "./utils/money.js"

function renderPage(){
    document.querySelector('.cart-p1').textContent = updateCart()
    const readCart = localStorage.getItem('readCart')

    if(readCart === 'yes'){
        updateOrders()
        clearCart()
        renderPage()
    }

    let html =``
    let html2 =``
    let item
    orders.forEach((order) => {
            order.items.forEach((itemOrder) => {
                item = getItem(itemOrder.id)
                html2 += `
                <div class="item">
                
                <div class="item-details">    
                <img src="${item.image}" alt="socks">
                <div class="details">
                    <p class="name">${item.name}</p>
                    <p>Arriving on: ${itemOrder.arrivalDate}</p>
                    <p class="quantity-order">Quantity: ${itemOrder.quantity}</p>
                    <button class="buy-again" data-item-id=${item.id}>
                    <img src="images/icons/buy-again.png" alt="buy again">Buy it again
                    </button>
                </div>
                </div>
                
                <a href="track.html?orderId=${order.id}&itemId=${item.id}">
                <button class="track">Track package</button>
                </a>
                </div>
            `
            })

            html += `<div class="order-header">
                <div class="date-price">
                <div class="date-order">
                    <p>Order Placed:</p>
                    <time datetime="08-12">${order.datePlaced}</time>
                </div>
                <div class="total">
                    <p>Total:</p>
                    <p>$${moneyConveter(order.totalCost)}</p>
                </div>
                </div>

                <div class="order-id">
                    <p>Order ID:</p>
                    <p>${order.id}</p>
                </div>
            </div>
            <div class="order-grid">
                ${html2}
            </div>`
            html2 = ``
    })

    document.querySelector('.order').innerHTML = html

    document.querySelectorAll('.buy-again').forEach(element => {
        element.addEventListener('click', () => {
                let cartFlag = 0
    
                cart.forEach((item) => {
                    if(item.id === element.dataset.itemId){
                        item.quantity += 1
                        cartFlag = 1
                    }
                })
                
                if(!cartFlag){
                cart.push({
                    id: element.dataset.itemId,
                    quantity: 1,
                    delivaryOptionId: '1'
                })
            
                localStorage.setItem('cart', JSON.stringify(cart))
                renderPage()
            }
        })
    });
}

renderPage()
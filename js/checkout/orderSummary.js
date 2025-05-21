import {cart, removeCartItem, updateCart, updateQuantity, updateDelivaryOption} from "../../data/cart.js"
import {items, getItem} from "../../data/products.js"
import { moneyConveter } from "../utils/money.js";
import { delivaryOptions, getDelivaryOption, calculateDelivaryDate } from "../../data/delivary-options.js";
import { renderpayment } from "./payment.js";


export default function renderPage(){
    let cartItemsHTML = ""
    document.querySelector('.items-count').textContent = updateCart()

    cart.forEach(cartItem => {
            
            const currentItem = getItem(cartItem.id)
            
            const matchingDelivaryOption = getDelivaryOption(cartItem.delivaryOptionId)
            
            const delivaryDate = calculateDelivaryDate(matchingDelivaryOption)

            cartItemsHTML += `
            <div class="item item-${currentItem.id}">
                <p class="delivary-date">
                    <datetime="2025-06-21" >Delivery date: ${delivaryDate.format("dddd, MMMM D")}</datetime>
                </p>
                <div class="item-grid">
                
                    <img src="${currentItem.image}" alt="${currentItem.name}">

                    <div class="item-details">
                        <p class="name">${currentItem.name}</p>
                        <p class="price">$${moneyConveter(currentItem.priceCents)}</p>
                        <Span>Quantity: <span class="value-${currentItem.id}">${cartItem.quantity}</Span></Span>
                        <span class="update-dele update update-${currentItem.id}" data-item-id=${currentItem.id}>Update</span>
                        <input type="text" class="update-input update-input-${currentItem.id}" value=${cartItem.quantity}>
                        <span class="update-dele save-update save-update-${currentItem.id}" data-item-id=${currentItem.id}>Save</span>
                        <span class="update-dele delete" data-item-id=${currentItem.id}>Delete</span>
                    </div>

                    <div class="delivary-option">
                        <p class="delivary-option-header">Choose a delivery option:</p>
                        ${delivaryOptionsHTML(currentItem, cartItem)}
                        </div>
                    </div>
                </div>`
        });
        
    function delivaryOptionsHTML(currentItem, cartItem){
        let html = ''
        delivaryOptions.forEach((delivaryOption) => {
            const delivaryDate = calculateDelivaryDate(delivaryOption)
            const Shipping = delivaryOption.priceCents === 0 ? 'FREE' : '$' + moneyConveter(delivaryOption.priceCents) + ' -'
            const check = delivaryOption.id === cartItem.delivaryOptionId ? 'checked' : ''
            html += `<div class="radio" data-item-id=${cartItem.id} data-delivary-option-id=${delivaryOption.id}>
                        <input type="radio" name="delivary-option-${currentItem.id}" id="" ${check}>
                        <div>
                        <p class="radio-p1">${delivaryDate.format("dddd, MMMM D")}</p> 
                        <p class="radio-p2">${Shipping} Shipping</p>
                        </div>
                    </div>
                    <br>`        
        }) 
        return html       
    }    
    document.querySelector('.items').innerHTML = cartItemsHTML

    document.querySelectorAll('.delete').forEach((deleteBtn) => {
        deleteBtn.addEventListener('click', () => {
            const itemId = deleteBtn.dataset.itemId
            removeCartItem(itemId)
            //document.querySelector(`.item-${itemId}`).remove()
            //document.querySelector('.items-count').textContent = updateCart()
            renderpayment()
            renderPage()
        })
    })

    document.querySelectorAll('.update').forEach((updateBtn) => {
        updateBtn.addEventListener('click', () => {
            const itemId = updateBtn.dataset.itemId
            document.querySelector(`.update-input-${itemId}`).classList.add('show-input-save')
            document.querySelector(`.save-update-${itemId}`).classList.add('show-input-save')
            document.querySelector(`.update-${itemId}`).classList.add('hide-update')
            document.querySelector(`.value-${itemId}`).classList.add('hide-update')
        })
    })

    document.querySelectorAll('.save-update').forEach((saveBtn) => {
        saveBtn.addEventListener('click', () => {
            const itemId = saveBtn.dataset.itemId
            const inputEl = document.querySelector(`.update-input-${itemId}`)

            if(inputEl.value){
                document.querySelector(`.value-${itemId}`).textContent = inputEl.value
                updateQuantity(itemId, Number(inputEl.value))
                document.querySelector('.items-count').textContent = updateCart()
            }

            inputEl.classList.remove('show-input-save')
            document.querySelector(`.save-update-${itemId}`).classList.remove('show-input-save')
            document.querySelector(`.update-${itemId}`).classList.remove('hide-update')
            document.querySelector(`.value-${itemId}`).classList.remove('hide-update')
            renderpayment()
        })
    })

    document.querySelectorAll('.radio').forEach((delivaryOption) => {
        delivaryOption.addEventListener('click', () => {
            const { itemId, delivaryOptionId} = delivaryOption.dataset
            updateDelivaryOption(itemId, delivaryOptionId)
            renderPage()
            renderpayment()
        })
    })
}
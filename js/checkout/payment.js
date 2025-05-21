import { cart, updateCart } from "../../data/cart.js";
import { getItem } from "../../data/products.js";
import { getDelivaryOption } from "../../data/delivary-options.js";
import { moneyConveter } from "../utils/money.js";

export function renderpayment(){
    let totalCostCents = 0
    let totalShippingCents = 0
    cart.forEach(element => {
        totalCostCents += element.quantity * getItem(element.id).priceCents
        totalShippingCents += getDelivaryOption(element.delivaryOptionId).priceCents
    });
    const totalCostBeforeTax = totalCostCents + totalShippingCents
    const taxCents = totalCostBeforeTax * 0.1
    const totalCostTax = totalCostBeforeTax + taxCents

    let html = `<p class="cost-header">Order Summary</p>
                <div class="space-between">
                    <p>Items (${updateCart()}):</p>
                    <p>$${moneyConveter(totalCostCents)}</p>
                </div>
                <div class="space-between">
                    <p>Shipping & handling:</p>
                    <p class="shipping-price">$${moneyConveter(totalShippingCents)}</p>
                </div>
                <div class="space-between">
                    <p>Total before tax:</p>
                    <p>$${moneyConveter(totalCostBeforeTax)}</p>
                </div>
                <div class="space-between estimated-tax">
                    <p>Estimated tax (10%):</p>
                    <p>$${moneyConveter(taxCents)}</p>
                </div>
                <div class="space-between">
                    <p class="total-cost">Order total:</p>
                    <p class="total-cost">$${moneyConveter(totalCostTax)}</p>
                </div>

                <button class="check-out-btn">Place your order</button>`

    document.querySelector('.cost').innerHTML = html
    document.querySelector('.check-out-btn').addEventListener('click', () => {
        if(cart.length > 0){
            localStorage.setItem('readCart', 'yes')
            window.location = 'orders.html'
        }
        
    })            
}
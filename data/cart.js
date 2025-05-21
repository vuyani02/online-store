export let cart = JSON.parse(localStorage.getItem('cart'))

if(!cart){
    cart = []
}


let cartFlag
let classIdEl
let setTimeoutId = 1
let prevBtn = ''
let currBtn = ''

export function addIterm(button){
    currBtn = button.dataset.itemId
    if(prevBtn === currBtn){
        clearTimeout(setTimeoutId)
    } 
    prevBtn = currBtn
    classIdEl = document.querySelector(`.quantity-${button.dataset.itemId}`)    
    cart.forEach((item) => {
        if(item.id === button.dataset.itemId){
            item.quantity += Number(classIdEl.value)
            cartFlag = 1
            document.querySelector(`.added-to-cart-${button.dataset.itemId}`).classList.add('added-to-cart-visible')
            setTimeoutId = setTimeout(() => {
                document.querySelector(`.added-to-cart-${button.dataset.itemId}`).classList.remove('added-to-cart-visible')
            }, 2000)
        }
    })
    
    if(!cartFlag){
    cart.push({
        id: button.dataset.itemId,
        quantity: Number(classIdEl.value),
        delivaryOptionId: '1'
    })

    saveToStorage()

    document.querySelector(`.added-to-cart-${button.dataset.itemId}`).classList.add('added-to-cart-visible')
    setTimeoutId = setTimeout(() => {
            document.querySelector(`.added-to-cart-${button.dataset.itemId}`).classList.remove('added-to-cart-visible')
        }, 2000)
    }

    cartFlag = 0
}

export function removeCartItem(productId) {
    for(let i = 0; i < cart.length; i++){
        if(productId === cart[i].id){
            cart.splice(i, 1)
            saveToStorage()
            break
        }
    }
}

function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart))
}

export function updateCart(){
    let cartTotal = 0
    cart.forEach((item) => {
        cartTotal += item.quantity
    })
    return cartTotal
}

export function updateQuantity(id, quantity){
    for(let i = 0; i < cart.length; i++){
        if(cart[i].id === id){
            cart[i].quantity = quantity
            saveToStorage()
            break
        }
    }
}

export function updateDelivaryOption(productId, delivaryOptionId){
    for(let i = 0; i < cart.length; i++){
        if(cart[i].id === productId){
            cart[i].delivaryOptionId = delivaryOptionId
            saveToStorage()
            break
        }
    }
}

export function clearCart(){
    cart = []
    localStorage.removeItem('cart')
}
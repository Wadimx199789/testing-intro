function addToCart(cart,product,count) {
  if(count <= 0){
    throw new RangeError('Вы не указали количество товара')
  }
  const indexOfproduct = cart.findIndex((cartProduct)=>cartProduct.id === product.id);
  const quantityInCart = indexOfproduct !== -1 ? cart[indexOfproduct].quantity : 0;
  if(product.stock<quantityInCart+count){
    throw new RangeError('Вы пытаетесь добавить больше товара чем есть на складе')
  }
  if(indexOfproduct!==-1){
    cart[indexOfproduct].quantity = cart[indexOfproduct].quantity+count;
  } else {
    cart.push({...product,quantity: count});
  }
  return cart
}
function changeQuantity(cart,productId,count) {
  if(count<=0){
    throw new RangeError('Вы не указали количество товара')
  } 
  indexOfproduct = cart.findIndex((product=>product.id === productId));
  if(indexOfproduct === -1) return cart;
  if(count>cart[indexOfproduct].stock) throw RangeError('Вы пытаетесь указать количество товара больше, чем есть на складе');
  cart[indexOfproduct].quantity = count
  return cart
}
function removeFromCart(cart,productId) { 
  indexOfproduct = cart.findIndex((product=>product.id === productId));
  if(indexOfproduct === -1) return cart;
  return cart.filter((product)=>product.id !== productId);
}
function calculateCartSubtotal(cart) { 
  if(cart.length === 0) return 0;
  return cart.reduce((prev,current)=>prev + current.price*current.quantity,0)
 }
function calculateOrderTotal(products,promo) {
  const subtotal = calculateCartSubtotal(products);
  const delivery = subtotal < 50000 ? 30000 : 0;
  if(promo!=='SAVE10') return { subtotal, discount: 0, delivery, total: subtotal + delivery };
  if(subtotal < 20000) return { subtotal, discount: 0, delivery, total: subtotal + delivery };
  const discount = Math.round(subtotal * 0.1);
  return { subtotal, discount, delivery, total: subtotal - discount + delivery };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;

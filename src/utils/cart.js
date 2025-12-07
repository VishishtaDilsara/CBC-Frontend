export function getCart() {
  let cart = localStorage.getItem("cart");
  cart = JSON.parse(cart);
  if (cart == null) {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
}

export function removeFromCart(productId) {
  let cart = getCart();
  let index = cart.findIndex((item) => {
    //if no same product found, index = -1
    return item.productId == productId;
  });
  const newCart = cart.filter((item) => {
    return item.productId != productId;
  });
  localStorage.setItem("cart", JSON.stringify(newCart));
}

export function addToCart(product, qty) {
  let cart = getCart();
  let index = cart.findIndex((item) => {
    //if no same product found, index = -1
    return item.productId == product.productId;
  });
  if (index == -1) {
    cart[cart.length] = {
      productId: product.productId,
      name: product.name,
      images: product.images[0],
      labelledPrice: product.labelledPrice,
      price: product.price,
      qty: qty,
    };
  } else {
    const newQty = cart[index].qty + qty;
    if (newQty <= 0) {
      removeFromCart(product.productId);
      return;
    } else {
      cart[index].qty = newQty;
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

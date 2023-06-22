export default class Cart {
    cartItems = []; // [product: {...}, count: N]

    constructor(cartIcon) {
        this.cartIcon = cartIcon;
    }

    addProduct(product) {
        if (!product) return;
        
        let cartItem = this.cartItems.find(item => item.product.id == product.id);
        if (!cartItem) {
            cartItem = {product, count: 1};
            this.cartItems.push(cartItem);
        } else {
            cartItem.count += 1;
        }

        this.onProductUpdate(cartItem);
    }

    updateProductCount(productId, amount) {
        let cartItemIndex = this.cartItems.findIndex(item => item.product.id == productId),
            cartItem = this.cartItems[cartItemIndex];

        cartItem.count += amount;
        if (cartItem.count == 0) this.cartItems.splice(cartItemIndex, 1);

        this.onProductUpdate(cartItem);
    }

    isEmpty() {
        return (this.cartItems.length) ? false : true;
    }

    getTotalCount() {
        return this.cartItems.reduce((count, current) => count + current.count, 0);
    }

    getTotalPrice() {
        return this.cartItems.reduce((price, current) => price + current.count * current.product.price, 0);
    }

    onProductUpdate(cartItem) {
        // console.log(this.cartItems);
        // реализуем в следующей задаче
        this.cartIcon.update(this);
    }
}
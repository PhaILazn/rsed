module.exports = function Cart(oldCart) {
    //Initialize variables
    //  if oldCart is undefined assign default values
    //  otherwise, carry over values from oldCart
    this.menuItems = oldCart.items ? oldCart.items : {};
    this.totalQty = oldCartl.totalQty ? oldCart.totalQty : 0;
    this.totalPrice = oldCart.totalPrice ? oldCart.totalPrice : 0;
    
    this.add = function(menuItem, id) {
        var storedItem = this.menuItems[id];
        if(!storedItem) {
            storedItem = this.menuItems[id] = {menuItem: menuItem, qty: 0, price: 0};
        }
        storedItem.qty++;
        
        storedItem.price = menuItem.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.menuItem.price;
    }

    this.generateArray = function() {
        var arr = [];
        menuItems.forEach(mItem => {
            arr.push(mItem);
        });
        return arr;
    }
}
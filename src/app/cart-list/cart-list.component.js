import {cartListTemplate} from './cart-list.template';
import {cartItemTemplate} from './cart-item.template';
import {priceListTemplate} from './price-list.template';
import {ShoppingListComponent} from '../shopping-list/shopping-list.component';

export class CartListComponent {	
	constructor() {	
		this.cartItems = [];
		this.shoppingObj = new ShoppingListComponent();
		this.shoppingList = this.shoppingObj.getShoppingList();
		this.cartListIDs = this.shoppingObj.getCartListIDs();
	}
	
	renderComponent() {
		let cartList = this.getCartList();
		let template = this.renderTemplate(cartList);
		return template;
	}
		
    renderTemplate(cartList, reRenderFlag) {
		let length = cartList.length;
		let priceDetails = {
			totalItems: 0,
			totalPrice: 0,
			totalDiscount: 0,
			totalPayable: 0
		}
		let itemsHTML = '';
		
		if (length) {
			for(let i=0; i<length; i++){
				priceDetails.totalItems = parseInt(priceDetails.totalItems + cartList[i].count);
				priceDetails.totalPrice = parseFloat(priceDetails.totalPrice + (cartList[i].price * cartList[i].count));
				priceDetails.totalDiscount = parseFloat(priceDetails.totalDiscount + ((cartList[i].price - cartList[i].discountPrice) * cartList[i].count));
				priceDetails.totalPayable = parseFloat(priceDetails.totalPrice - priceDetails.totalDiscount);
				itemsHTML = itemsHTML + cartItemTemplate(cartList[i]);
			}

			if (reRenderFlag) {
				document.querySelector('#cart-list-section').innerHTML = cartListTemplate(itemsHTML, priceListTemplate(priceDetails));
				this.addCartListEvents();
			}
			else {
				return cartListTemplate(itemsHTML, priceListTemplate(priceDetails));
			}
		}
		else {
			document.querySelector('#cart-list-section').innerHTML = "<div class='empty-cart'>Your cart is empty!!!</div>";
		}
	}
	
	getCartList() {
		for (let index in this.shoppingList) {
			var count = 0;
			var isObjExist = false;
			for (let id of this.cartListIDs) {
				if (parseInt(this.shoppingList[index]['id']) == parseInt(id)) {
					if (!isObjExist) {
						this.cartItems.push(this.shoppingList[index]);
						isObjExist = true;
					}
					let lastIndex = this.cartItems.lastIndexOf(this.shoppingList[index]);
					this.cartItems[lastIndex]['count'] = ++count;
				}
			}
		}

		return this.cartItems;
	}

	addCartItem(id) {
		let index;
		let isElemAvailable = this.cartItems.some(function (elem, i) {
			return parseInt(elem.id) === parseInt(id) ? (index = i, true) : false;
		});
		
		if (isElemAvailable) {
			this.cartItems[index].count = this.cartItems[index].count + 1;
			this.renderTemplate(this.cartItems, true);
		}
	}

	removeCartItem(id, category) {
		let index;
		let isElemAvailable = this.cartItems.some(function (elem, i) {
			return parseInt(elem.id) === parseInt(id) ? (index = i, true) : false;
		});
		
		if (category == 'bulk') {
			if (isElemAvailable) {
				this.cartItems.splice(index, 1);
			}
		}
		else {
			if (this.cartItems[index].count > 1)
				this.cartItems[index].count = this.cartItems[index].count - 1;
			else 
				this.cartItems.splice(index, 1);
		}
		this.renderTemplate(this.cartItems, true);
	}

	addCartListEvents() {
		document.querySelectorAll('.cart-list .item-details .remove-section').forEach(item => {
			item.addEventListener('click', event => {
				let itemID = item.getAttribute('itemid');
				this.removeCartItem(itemID, 'bulk'); // Remove the complete item
			});
		});

		document.querySelectorAll('.cart-list .item-details .remove-item').forEach(item => {
			item.addEventListener('click', event => {
				let itemID = item.getAttribute('itemid');
				this.removeCartItem(itemID); // Reduce the count from the item
			});
		});

		document.querySelectorAll('.cart-list .item-details .add-item').forEach(item => {
			item.addEventListener('click', event => {
				let itemID = item.getAttribute('itemid');
				this.addCartItem(itemID); // Add the count to the item
			});
		});
	}
};
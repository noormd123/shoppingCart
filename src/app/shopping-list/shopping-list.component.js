import {shoppingListTemplate} from './shopping-list.template';
import {shoppingItemTemplate} from './shopping-item.template';
import {CartComponent} from '../cart/cart.component';

export class ShoppingListComponent {	
	constructor() {
		
		if (!!ShoppingListComponent.instance) {
            return ShoppingListComponent.instance;
        }
	
		this.cartListIDs = [];
		this.shoppinglist = [];
		this.shoppinglistLength = 0;

		this.cartHeader = new CartComponent();
		ShoppingListComponent.instance = this;
	}
	
	getShoppingList() {
		return this.shoppinglist;
	}

	getCartListIDs() {
		return this.cartListIDs;
	}

	async renderComponent() {
		let data = await this.loadData();
		let template;
		
		this.shoppinglist = data;
		this.shoppinglistLength = this.shoppinglist.length;
		for(let i=0; i<this.shoppinglistLength; i++){
			this.shoppinglist[i].discountPrice = this.shoppinglist[i].price - (this.shoppinglist[i].price * this.shoppinglist[i].discount / 100);
		}
		template = this.renderTemplate();
		return template;
	}
	
	
	async loadData() {
		try {
			let response = await fetch('https://api.myjson.com/bins/qzuzi');
			let data = await response.json();
			return data;
		}
		catch(err) {
			// Load Dummy Data in case above URL fails.
			return [{"id":9090,"name":"Item1","price":200,"discount":10,"category":"fiction","img_url":"http://lorempixel.com/500/600/technics/"},{"id":9091,"name":"Item2","price":250,"discount":15,"category":"literature","img_url":"http://lorempixel.com/500/600/technics/"},{"id":9092,"name":"Item3","price":320,"discount":5,"category":"literature","img_url":"http://lorempixel.com/500/600/technics/"},{"id":9093,"name":"Item4","price":290,"discount":0,"category":"thriller","img_url":"http://lorempixel.com/500/600/technics/"},{"id":9094,"name":"Item1","price":500,"discount":25,"category":"thriller","img_url":"http://lorempixel.com/500/600/technics/"},{"id":9095,"name":"Item2","price":150,"discount":5,"category":"literature","img_url":"http://lorempixel.com/500/600/technics/"},{"id":9096,"name":"Item3","price":700,"discount":22,"category":"literature","img_url":"http://lorempixel.com/500/600/technics/"},{"id":9097,"name":"Item4","price":350,"discount":18,"category":"fiction","img_url":"http://lorempixel.com/500/600/technics/"}]
		}
	}
	
    renderTemplate() {
		let itemsHTML = '';
		for(let i=0; i<this.shoppinglistLength; i++){
			itemsHTML = itemsHTML + shoppingItemTemplate(this.shoppinglist[i]);
		}
        return shoppingListTemplate(itemsHTML);
    }
	
	addShoppingListEvents() {

		document.querySelectorAll('.addToCart').forEach(item => {
		  	item.addEventListener('click', event => {
				let itemID = item.getAttribute('itemid');
				this.cartListIDs.push(itemID);
				this.cartHeader.render(this.cartListIDs.length);
		  	});
		});	
	}

	

	reRender() {
		let itemsHTML = '';		
		for(let i=0; i<this.shoppinglistLength; i++){
			itemsHTML = itemsHTML + shoppingItemTemplate(this.shoppinglist[i]);
		}
		document.querySelector('#shopping-list').innerHTML = itemsHTML;
	}

	sortData(direction) {
		if (direction === 'asc') {
			this.shoppinglist.sort(function(a, b){
				return a.price-b.price;
			});
		}
		else if (direction === 'desc') {
			this.shoppinglist.sort(function(a, b){
				return b.price-a.price;
			});
		}
		else if (direction === 'discount') {
			this.shoppinglist.sort(function(a, b){
				return a.discount-b.discount;
			});
		}
		this.reRender();
		this.addShoppingListEvents();
	}
};
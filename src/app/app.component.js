import {HeaderComponent} from './header/header.component';
import {FilterComponent} from './filter/filter.component';
import {SortComponent} from './sort/sort.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {CartListComponent} from './cart-list/cart-list.component';
import {FooterComponent} from './footer/footer.component';

export const AppComponent = {

    init() {
        this.appElement = document.querySelector('#app');
        this.render();
    },

    render() {
		this.loadHeader();
		this.renderPage('shoppingList');
		this.loadFooter();
    },
	
	loadHeader() {
		let headerComponent = new HeaderComponent();
		this.header = '<header>';
		this.header += headerComponent.render();
		this.header += '</header>';
	},
	
	async loadContent(page) {
		this.cartList = new CartListComponent();
		this.sortSection = new SortComponent();

		switch(page) {
			case 'addToCart': {
				let cartListContent = await this.cartList.renderComponent();

				this.content = '<section id="cart-list-section">';
				this.content += cartListContent;
				this.content += '</section>';
				break;
			}
			
			case 'shoppingList': {
				this.shoppingList = new ShoppingListComponent();
				let shoppingListContent = await this.shoppingList.renderComponent();
				
				this.content = '<section>';
				this.content += FilterComponent.render();
				this.content += '<div class="content">';
				this.content += this.sortSection.render();
				this.content += shoppingListContent;
				this.content += '</div>';
				this.content += '<div class="clear"></div>';
				this.content += '</section>';
				break;
			}
		}
			
		return this.content;
	},
	
	loadFooter() {
		this.footer = '<footer>';
		this.footer += FooterComponent.render();
		this.footer += '</footer>';
	},
	
	async renderPage(page) {
		this.appElement.innerHTML = this.header + await this.loadContent(page) + this.footer;
			// Need to move to specific components
			this.shoppingList.addShoppingListEvents();
			this.sortSection.addSortEvents();
			this.cartList.addCartListEvents();
	}
};
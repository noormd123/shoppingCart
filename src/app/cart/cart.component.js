import {cartTemplate} from './cart.template';
import {AppComponent} from '../app.component';

export class CartComponent {
    constructor() {
        this.totalCart = '';
    }
    
    render(cartValue) {
		if (cartValue) {
            this.totalCart = cartValue;
            document.querySelector('#totalCart').innerHTML = this.totalCart;
        }

		this.addCartEvents();
		
        return cartTemplate(this.totalCart);
    }

	addCartEvents() {
		document.body.addEventListener("click", event => {
			event.stopImmediatePropagation();
			if (event.target.id == "totalCart") {
				AppComponent.renderPage('addToCart');
			}
		});
	}
};
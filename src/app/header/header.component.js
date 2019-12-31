import {SearchComponent} from '../search/search.component';
import {CartComponent} from '../cart/cart.component';
import {headerTemplate} from './header.template';


export class HeaderComponent {
    constructor() {
        this.totalCart = '';
    }
    
    render(cartValue) {
		let search = new SearchComponent();
		let cart = new CartComponent();

        return headerTemplate(search.render(), cart.render());
    }
};
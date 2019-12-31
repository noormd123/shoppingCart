import {CartComponent} from '../cart/cart.component';

export const cartTemplate = (totalCart) => `
        <div class="cart">
			<span class="cart-total" id="totalCart">${totalCart}</span>
		</div>
		
`;
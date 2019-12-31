export const cartListTemplate = (cartListHTML, priceListHTML) => `
	<div class="cart-list" id="cart-list">
	${cartListHTML}
	</div>
	<div class="price-details" id="price-list">
		${priceListHTML}
	</div>
	<div class="clear"></div>
`;
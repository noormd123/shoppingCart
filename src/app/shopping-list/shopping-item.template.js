export const shoppingItemTemplate = item => `
	<div class="shopping-item">
		<div class="item-image">
			<img src="${item.img_url}" width="100" height="120" />
		</div>
		<div class="item-name">${item.name}</div>
		<div class="item-value">
			<span class="discount-price">₹${item.discountPrice}</span>
			<span class="original-price">${item.price}</span>
			<span class="discount">${item.discount}% off</span>
		</div>
		<div class="add-to-cart">
			<button class="addToCart" itemid="${item.id}" type="button">Add to Cart</button>
		</div>
	</div>
`;
export const cartItemTemplate = (item) => `
	<div class="cart-item">
		<div class="item-image float-left">
			<img src="${item.img_url}" width="100" height="120" />
		</div>
		<div class="item-details float-left">
			<div class="item-section">
				<div class="item-name">${item.name}</div>
				<div class="item-value">
					<span class="discount-price">₹${item.discountPrice}</span>
					<span class="original-price">${item.price}</span>
					<span class="discount">${item.discount}% off</span>
				</div>
			</div>
			<div class="count-section">
				<div class="add-remove-icon minus-icon remove-item" itemid="${item.id}"></div>
				<div class="count">${item.count}</div>
				<div class="add-remove-icon plus-icon add-item" itemid="${item.id}"></div>
			</div>
			<div class="remove-section" itemid="${item.id}">REMOVE</div>
		</div>
		<div class="clear"></div>
	</div>
`;
export const priceListTemplate = priceDetails => `
	<h3>PRICE DETAILS</h3>
	<table>
		<tbody>
			<tr>
				<th align="left">Price (${priceDetails.totalItems} item(s))</th>
				<td>:</td>
				<td align="right">₹${priceDetails.totalPrice}</td>
			</tr>
			<tr>
				<th align="left">Discount</th>
				<td>:</td>
				<td align="right">₹${priceDetails.totalDiscount}</td>
			</tr>
		</tbody>
		<tfoot>
			<tr>
				<th align="left">Total Payable</th>
				<td>:</td>
				<td align="right">₹${priceDetails.totalPayable}</td>
			</tr>
		</tfoot>
	</table>
`;
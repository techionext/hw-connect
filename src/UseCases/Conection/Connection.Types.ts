export interface IOrderProduct {
	id: number;
	name: string;
	type: string;
}

export interface IOrderTransaction {
	transaction_number: string;
	campaign_name: string;
	campaign_id: number;
	gateway_name: string;
	gateway_id: number;
	external_transaction_id: string;
	status: string;
	amount: string;
	currency: string;
	payment_method: string;
	affiliate_name: string;
	affiliate_id: string;
	sub1: string | null;
	sub2: string | null;
	sub3: string | null;
	sub4: string | null;
	sub5: string | null;
	utm_source: string | null;
	utm_medium: string | null;
	utm_campaign: string | null;
	utm_term: string | null;
	utm_content: string | null;
	card_brand: string;
	card_first_six: string;
	card_last_four: string;
	is_upsell: boolean;
	upsell_depth: number;
	gateway_response: string;
	created_at: string;
	updated_at: string;
	products: IOrderProduct[];
}

export interface IOrderCartItem {
	quantity: string | number;
	name: string;
	unit_price: string | number;
	shipping_price: string | number;
	subtotal: number;
	tax: number;
	is_upsell: boolean;
	id: number;
	type: string;
}

export interface IOrderCart {
	tax: string;
	items: IOrderCartItem[];
	total: string;
	shipping: string;
	subtotal: string;
}

export interface IOrder {
	order_number: string;
	campaign_name: string;
	campaign_id: number;
	affiliate_name: string;
	affiliate_id: string;
	sub1: string | null;
	sub2: string | null;
	sub3: string | null;
	sub4: string | null;
	sub5: string | null;
	utm_source: string | null;
	utm_medium: string | null;
	utm_campaign: string | null;
	utm_term: string | null;
	utm_content: string | null;
	status: string;
	currency: string;
	tax_amount: string;
	tax_rate: number;
	is_throttled: boolean;
	created_at: string;
	transactions: IOrderTransaction[];
	cart: IOrderCart;
}

export interface IOrderResponse {
	success: boolean;
	data: {
		customer_number: string;
		first_name: string;
		last_name: string;
		full_name: string;
		email: string;
		phone: string;
		created_at: string;
		orders: IOrder[];
		addresses: {
			name: string;
			street_1: string;
			street_2: string | null;
			city: string;
			state_province: string;
			postal_code: string;
			country_code: string;
			phone: string;
			email: string;
			type: string;
			is_primary: false;
			is_billing: false;
			is_shipping: false;
		}[];
	}[];
}

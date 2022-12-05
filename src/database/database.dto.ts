export type createOrder = {
	orderId: string;
	customerId: string;
	orderItem: createOrderItem[];
};

type createOrderItem = {
	productId: string;
	imageURL: string;
	qty: number;
};

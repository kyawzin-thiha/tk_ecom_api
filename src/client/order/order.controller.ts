import {
	Controller,
	Get,
	UseGuards,
	HttpException,
	Request,
	Body,
	Put,
	Post,
	UseInterceptors,
	UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { DatabaseService } from 'src/database/database.service';
import { AwsService } from 'src/helper/aws.service';
import { ClientGuard } from '../client.guard';

@UseGuards(ClientGuard)
@Controller('order')
export class OrderController {
	constructor(
		private readonly databaseService: DatabaseService,
		private readonly awsService: AwsService,
	) {}

	@Get('getAll')
	async getAll(@Request() req, @Body() data: { from: Date; to: Date }) {
		const user = req.user;
		const orders = await this.databaseService.searchOrdersByCustomerId(
			user.userId,
			data.from,
			data.to,
		);
		return orders;
	}

	@Get('getOrder')
	async getOrder(@Request() req, @Body() data: { orderId: string }) {
		const user = req.user;
		const order = await this.databaseService.getOrder(data.orderId);
		if (order.customerId !== user.userId) {
			throw new HttpException('Unauthorized', 401);
		}
		return order;
	}

	@Post('createOrder')
	@UseInterceptors(FilesInterceptor('images'))
	async createOrder(
		@Request() req,
		@Body()
		data: {
			order: { productId: string; qty: number, image: string }[];
			orderItems: number;
			uniqueOrderItems: number;
		},
		@UploadedFiles() images: Array<Express.Multer.File>,
	) {
		try {
			const user = req.user as string;
			const orderId = `O:${new Date().getTime()}#${data.orderItems}/${
				data.uniqueOrderItems
				}`;
			const customOrder = {
				orderId,
				customerId: user,
				orderItem: data.order.map((order) => ({ productId: order.productId, qty: order.qty, imageURL: "" }))
			};
			images.forEach(async (image, index) => {
                const imageURL = await this.awsService.uploadFile(user, orderId, image);
                customOrder.orderItem[index].imageURL = imageURL;
			});
			const order = await this.databaseService.createOrder(customOrder);
			return order;
		} catch (error) {
			throw new HttpException('Internal Server Error', 500);
		}
	}

	@Put('cancelOrder')
	async cancelOrder(@Request() req, @Body() data: { orderId: string }) {
		const user = req.user;
		const order = await this.databaseService.getOrder(data.orderId);
		if (order.customerId !== user.userId) {
			throw new HttpException('Unauthorized', 401);
		}
		await this.databaseService.updateOrderStatus(data.orderId, 'CANCELLED');
		return;
	}
}

import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	Param,
	Put,
	UseGuards,
} from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { AdminGuard } from '../admin.guard';

@UseGuards(AdminGuard)
@Controller('order')
export class OrderController {
	constructor(private readonly databaseService: DatabaseService) {}

	@Get(':orderId')
	async getOrder(@Param() data: { orderId: string }) {
		try {
			return this.databaseService.getOrder(data.orderId);
		} catch (error) {
			throw new HttpException('Internal Server Error', 500);
		}
	}

	@Get('getAll')
	async getallOrders() {
		try {
			return await this.databaseService.getAllOrders();
		} catch (error) {
			throw new HttpException('Internal Server Error', 500);
		}
	}

	@Get('searchOrdersByDate')
	async searchOrdersByDate(@Body() data: { from: Date; to: Date }) {
		try {
			return this.databaseService.searchOrdersByDate(data.from, data.to);
		} catch (error) {
			throw new HttpException('Internal Server Error', 500);
		}
	}

	@Get('searchOrdersByCustomerId')
	async searchOrdersByCustomerId(
		@Body() data: { customerId: string; from: Date; to: Date },
	) {
		try {
			return this.databaseService.searchOrdersByCustomerId(
				data.customerId,
				data.from,
				data.to,
			);
		} catch (error) {
			throw new HttpException('Internal Server Error', 500);
		}
	}

	@Get('searchOrdersByProductId')
	async searchOrdersByProductId(
		@Body() data: { productId: string; from: Date; to: Date },
	) {
		try {
			return this.databaseService.searchOrdersByProductId(
				data.productId,
				data.from,
				data.to,
			);
		} catch (error) {
			throw new HttpException('Internal Server Error', 500);
		}
	}

	@Get('searchOrdersByOrderStatus')
	async searchOrdersByStatus(
		@Body() data: { status: OrderStatus; from: Date; to: Date },
	) {
		try {
			return this.databaseService.searchOrdersByOrderStatus(
				data.status,
				data.from,
				data.to,
			);
		} catch (error) {
			throw new HttpException('Internal Server Error', 500);
		}
	}

	@Put('updateOrderStatus')
	async updateOrderStatus(
		@Body() data: { orderId: string; status: OrderStatus },
	) {
		try {
			return this.databaseService.updateOrderStatus(data.orderId, data.status);
		} catch (error) {
			throw new HttpException('Internal Server Error', 500);
		}
	}

	@Delete('deleteOrder')
	async deleteOrder(@Body() data: { orderId: string }) {
		try {
			return this.databaseService.deleteOrder(data.orderId);
		} catch (error) {
			throw new HttpException('Internal Server Error', 500);
		}
	}
}

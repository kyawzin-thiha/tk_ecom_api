import { Injectable } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { PrismaService } from 'src/helper/prisma.service';
import { createOrder } from './database.dto';

@Injectable()
export class DatabaseService {
	constructor(private readonly prismaService: PrismaService) {}

	async createOrder(order: createOrder) {
		return this.prismaService.order.create({
			data: {
				orderId: order.orderId,
				customerId: order.customerId,
				orderItems: {
					createMany: {
						data: order.orderItem,
					},
				},
			},
		});
	}

	async getOrder(orderId: string) {
		return this.prismaService.order.findUnique({
			where: {
				orderId: orderId,
			},
		});
	}

	async getAllOrders() {
		return this.prismaService.order.findMany({
			orderBy: {
				createdAt: 'desc',
			},
		});
	}

	async searchOrdersByDate(from: Date, to: Date) {
		return this.prismaService.order.findMany({
			where: {
				createdAt: {
					gte: from,
					lte: to,
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
	}

	async searchOrdersByCustomerId(customerId: string, from: Date, to: Date) {
		return this.prismaService.order.findMany({
			where: {
				customerId: customerId,
				createdAt: {
					gte: from,
					lte: to,
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
	}

	async searchOrdersByProductId(productId: string, from: Date, to: Date) {
		return this.prismaService.order.findMany({
			where: {
				orderItems: {
					some: {
						productId: productId,
					},
				},
				createdAt: {
					gte: from,
					lte: to,
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
	}

	async searchOrdersByOrderStatus(
		orderStatus: OrderStatus,
		from: Date,
		to: Date,
	) {
		return this.prismaService.order.findMany({
			where: {
				orderStatus: orderStatus,
				createdAt: {
					gte: from,
					lte: to,
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
	}

	async updateOrderStatus(orderId: string, orderStatus: OrderStatus) {
		return this.prismaService.order.update({
			where: {
				orderId: orderId,
			},
			data: {
				orderStatus: orderStatus,
			},
		});
	}

	async deleteOrder(orderId: string) {
		return this.prismaService.order.delete({
			where: {
				orderId: orderId,
			},
		});
	}
}

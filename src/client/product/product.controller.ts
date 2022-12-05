import { ClientGuard } from './../client.guard';
import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import fetch from 'node-fetch';

@UseGuards(ClientGuard)
@Controller('product')
export class ProductController {
	@Get('getAll')
	async getAllProduct(@Request() req) {
		const user = req.user;
		const data = await fetch(`${process.env.API_URL}/commerce/product/getAll`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'User-Agent': '*',
			},
			body: JSON.stringify({ user: user }),
		});
		return await data.json();
	}

	@Get(':productId')
	async getProductById(@Request() req, @Param('productId') productId: string) {
		const user = req.user;
		const data = await fetch(
			`${process.env.API_URL}/commerce/product/${productId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'User-Agent': '*',
				},
				body: JSON.stringify({ user: user }),
			},
		);
		return await data.json();
	}
}

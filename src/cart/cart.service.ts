import { InjectRepository } from '@nestjs/typeorm';

import { Cart } from './entities/cart.entity';
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { MoreThan, Repository } from 'typeorm';
import { NewCartInput } from './dto/new-cart.input';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findOneById(id: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { id: id },
      relations: {
        product: true,
      },
    });

    return cart;
  }

  async create(data: NewCartInput): Promise<Cart> {
    // retrieve the product details to include them in the cart
    const product = await this.productRepository.findOneBy({
      id: data.productId,
    });

    if (!product) {
      throw new BadRequestException('Product not found');
    }

    // get seats occupied by current carts' sessions
    let now = new Date();
    const sum =
      (await this.cartRepository.sum('travelerAmount', {
        expiresAt: MoreThan(now),
        product: product,
      })) || 0;

    if (sum + data.travelerAmount > product.totalSeats) {
      throw new BadRequestException('Too many seats requested');
    }

    now = new Date();
    const expiresAt = new Date(now.getTime() + 15 * 60000); // add 15 min to cart lifetime
    try {
      const cart = await this.cartRepository.create({
        createdAt: now,
        expiresAt: expiresAt,
        updatedAt: null,
        product: product,
        travelerAmount: data.travelerAmount,
        travelerEmail: data.travelerEmail,
        unitPrice: product.price,
        totalAmount: product.price * data.travelerAmount,
      });

      return await this.cartRepository.save(cart);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
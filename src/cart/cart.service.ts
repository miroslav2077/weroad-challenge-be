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
    const now = new Date();
    const cart = await this.cartRepository.findOneOrFail({
      where: {
        id: id,
        expiresAt: MoreThan(now),
        isPaid: false,
      },
      relations: {
        product: true,
      },
    });

    return cart;
  }

  async create(data: NewCartInput): Promise<Cart> {
    // retrieve the product details to include them in the cart
    const product = await this.productRepository.findOneByOrFail({
      id: data.productId,
    });

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
        isPaid: false,
      });

      return await this.cartRepository.save(cart);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async setAsPaid(id: string): Promise<boolean> {
    const now = new Date();
    try {
      const response = await this.cartRepository.update(
        {
          id: id,
          expiresAt: MoreThan(now),
          isPaid: false,
        },
        { isPaid: true },
      );

      return response.affected === 1;
    } catch (error) {
      return false;
    }
  }
}

import { InjectRepository } from '@nestjs/typeorm';

import { Product } from './entities/product.entity';
import { Cart } from '../cart/entities/cart.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { MoreThan, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}
  async findOneById(id: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id: id });

    return product;
  }

  async findOneBySlug(slug: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({ slug: slug });

    return product;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find();

    return products;
  }

  async getAvailableSeats(id: string): Promise<number> {
    const now = new Date();
    const product = await this.productRepository.findOneBy({ id: id });

    if (!product) {
      throw new NotFoundException('Invalid product id');
    }
    const sum =
      (await this.cartRepository.sum('travelerAmount', [
        {
          expiresAt: MoreThan(now),
          product: product,
        },
        {
          isPaid: true,
          product: product,
        },
      ])) || 0;

    return product.totalSeats - sum;
  }
}

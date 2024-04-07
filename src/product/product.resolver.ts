import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver(of => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(returns => Product)
  async product(@Args('id') id: string): Promise<Product> {
    try {
      const product = await this.productService.findOneById(id);
      return product;
    } catch {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  }

  @Query(returns => Product)
  async productBySlug(@Args('slug') slug: string): Promise<Product> {
    try {
      const product = await this.productService.findOneBySlug(slug);
      return product;
    } catch {
      throw new NotFoundException(`Product with slug ${slug} not found`);
    }
  }

  @Query(returns => [Product])
  async products(): Promise<Product[]> {
    try {
      const products = await this.productService.findAll();
      return products;
    } catch {
      throw new NotFoundException('No products found');
    }
  }

  @Query(returns => Number)
  async availableSeats(@Args('id') id: string): Promise<number> {
    try {
      const availableSeats = await this.productService.getAvailableSeats(id);

      return availableSeats;
    } catch {
      throw new BadRequestException("Couldn't retrieve available seats");
    }
  }
}

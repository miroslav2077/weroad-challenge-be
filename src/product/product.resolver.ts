import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver(of => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(returns => Product)
  async product(@Args('id') id: string): Promise<Product> {
    const product = await this.productService.findOneById(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  @Query(returns => Product)
  async productBySlug(@Args('slug') slug: string): Promise<Product> {
    const product = await this.productService.findOneBySlug(slug);

    if (!product) {
      throw new NotFoundException(`Product with slug ${slug} not found`);
    }
    return product;
  }

  @Query(returns => [Product])
  async products(): Promise<Product[]> {
    const products = await this.productService.findAll();
    if (!products.length) {
      throw new NotFoundException('No products found');
    }
    return products;
  }

  @Query(returns => Number)
  async availableSeats(@Args('id') id: string): Promise<number> {
    const availableSeats = await this.productService.getAvailableSeats(id);

    return availableSeats;
  }
}

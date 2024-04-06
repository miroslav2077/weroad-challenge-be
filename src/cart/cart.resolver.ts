import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';

import { Cart } from './entities/cart.entity';
import { CartService } from './cart.service';
import { NewCartInput } from './dto/new-cart.input';

@Resolver(of => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Query(returns => Cart)
  async cart(@Args('id') id: string): Promise<Cart> {
    const cart = await this.cartService.findOneById(id);
    if (!cart) {
      throw new NotFoundException(`Cart with id ${id} not found`);
    }
    return cart;
  }

  @Mutation(returns => Cart)
  async addCart(@Args('newCartData') newCartData: NewCartInput): Promise<Cart> {
    const cart = await this.cartService.create(newCartData);

    return cart;
  }

  // @Query(returns => [Cart])
  // async carts(): Promise<Cart[]> {
  //   const carts = await this.productService.findAll();
  //   if (!carts.length) {
  //     throw new NotFoundException();
  //   }
  //   return carts;
  // }
}
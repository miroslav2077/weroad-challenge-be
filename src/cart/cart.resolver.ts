import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';

import { Cart } from './entities/cart.entity';
import { CartService } from './cart.service';
import { NewCartInput } from './dto/new-cart.input';

@Resolver(of => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Query(returns => Cart)
  async cart(@Args('id') id: string): Promise<Cart> {
    try {
      const cart = await this.cartService.findOneById(id);
      return cart;
    } catch {
      throw new NotFoundException(`Cart with id ${id} not found`);
    }
  }

  @Mutation(returns => Cart)
  async addCart(@Args('newCartData') newCartData: NewCartInput): Promise<Cart> {
    try {
      const cart = await this.cartService.create(newCartData);
      return cart;
    } catch {
      throw new BadRequestException('Could not create cart');
    }
  }

  @Mutation(returns => Boolean)
  async setAsPaid(@Args('id') id: string): Promise<boolean> {
    const isSuccessful = await this.cartService.setAsPaid(id);

    if (!isSuccessful) {
      throw new BadRequestException(`Cannot set cart with id ${id} as paid`);
    }

    return isSuccessful;
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

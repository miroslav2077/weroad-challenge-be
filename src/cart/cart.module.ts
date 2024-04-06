import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartResolver } from './cart.resolver';
import { CartService } from './cart.service';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Product])],
  providers: [CartResolver, CartService],
})
export class CartModule {}

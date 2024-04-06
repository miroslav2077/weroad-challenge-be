import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import {
  Field,
  GraphQLISODateTime,
  ID,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { Product } from '../../product/entities/product.entity';

@Entity('cart')
@ObjectType({ description: 'cart' })
export class Cart {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({ nullable: true })
  updatedAt: Date;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn()
  expiresAt: Date;

  @Field(() => String)
  @Column()
  @MaxLength(150)
  travelerEmail: string;

  @Field(() => Int)
  @Column()
  travelerAmount: number;

  @Field(() => Int)
  @Column()
  unitPrice: number;

  @Field(() => Product)
  @ManyToOne((_type) => Product, (product: Product) => product.id)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  isPaid: boolean = false;

  @Field(() => Int)
  @Column()
  totalAmount: number;
}

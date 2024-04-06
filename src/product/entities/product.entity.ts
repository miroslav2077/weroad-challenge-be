import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import {
  Field,
  GraphQLISODateTime,
  ID,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import { Cart } from '../../cart/entities/cart.entity';

@Entity('product')
@ObjectType({ description: 'product' })
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column({ length: 100 })
  slug: string;

  @Field(() => String)
  @Column({ length: 100 })
  name: string;

  @Field(() => String)
  @Column({ length: 800 })
  description: string;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn()
  startingDate: Date;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn()
  endingDate: Date;

  @Field(() => Int)
  @Column()
  price: number;

  @Field(() => Int)
  @Column()
  totalSeats: number;

  @Field(() => Int)
  @Column()
  @Min(0)
  @Max(100)
  nature: number;

  @Field(() => Int)
  @Column()
  @Min(0)
  @Max(100)
  relax: number;

  @Field(() => Int)
  @Column()
  @Min(0)
  @Max(100)
  history: number;

  @Field(() => Int)
  @Column()
  @Min(0)
  @Max(100)
  culture: number;

  @Field(() => Int)
  @Column()
  @Min(0)
  @Max(100)
  party: number;

  @Field(() => String)
  @Column()
  imageUrl: string;

  @Field(() => Cart)
  @OneToMany((_type) => Cart, (cart: Cart) => cart.product)
  carts: Cart[];
}

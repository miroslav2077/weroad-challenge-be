import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../product/entities/product.entity';
import { Cart } from '../cart/entities/cart.entity';

export const TypeOrmMemoryDBTestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    entities: [Product, Cart],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([Product, Cart]),
];

import { Product } from '../product/entities/product.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { products } from '../entities.seed';

export class ProductsDefaultData1712063088562 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const product of products) {
      await queryRunner.manager.insert(Product, product);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}

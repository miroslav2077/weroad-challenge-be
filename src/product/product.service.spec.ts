import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmMemoryDBTestingModule } from '../test-utils/typeorm.memorydb.module';
import { ProductService } from './product.service';
import { ObjectLiteral, Repository } from 'typeorm';
import { Cart } from '../cart/entities/cart.entity';
import { Product } from './entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { products } from '../entities.seed';

describe('Product Service', () => {
  let service: ProductService;
  let cartRepository: Repository<Cart>;
  let productRepository: Repository<Product>;

  const CART_REPOSITORY_TOKEN = getRepositoryToken(Cart);
  const PRODUCT_REPOSITORY_TOKEN = getRepositoryToken(Product);

  let INSERTED_PRODUCT_IDENTIFIERS: ObjectLiteral[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmMemoryDBTestingModule()],
      providers: [ProductService],
      exports: [...TypeOrmMemoryDBTestingModule()],
    }).compile();

    service = module.get<ProductService>(ProductService);
    cartRepository = module.get<Repository<Cart>>(CART_REPOSITORY_TOKEN);
    productRepository = module.get<Repository<Product>>(
      PRODUCT_REPOSITORY_TOKEN,
    );

    try {
      const result = await productRepository.insert(products);
      INSERTED_PRODUCT_IDENTIFIERS = result.identifiers;
    } catch {
      process.exit(1);
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('cartRepository should be defined', () => {
    expect(cartRepository).toBeDefined();
  });

  it('productRepository should be defined', () => {
    expect(productRepository).toBeDefined();
  });

  it('productRepository should have 0 carts in it', async () => {
    const result = await cartRepository.find();
    expect(result).toHaveLength(0);
  });

  it(`productRepository should have ${products.length} products in it`, async () => {
    const result = await productRepository.find();
    expect(result).toHaveLength(products.length);
  });

  it('should return a product', async () => {
    const result = await service.findOneById(
      INSERTED_PRODUCT_IDENTIFIERS[0].id,
    );

    expect(result).toMatchObject(products[0]);
  });

  it(`should reject promise since product with id "nonexistant-id" doesn't exist`, async () => {
    await expect(
      async () => await service.findOneById('nonexistant-id'),
    ).rejects.toThrow();
  });

  it(`should return a list of ${products.length} products`, async () => {
    const result = await service.findAll();
    expect(result).toHaveLength(3);
  });

  it(`should return a product using the slug`, async () => {
    const result = await service.findOneBySlug(products[0].slug);
    expect(result).toMatchObject(products[0]);
  });

  it(`should reject promise since product with slug "nonexistant-slug" doesn't exist`, async () => {
    await expect(
      async () => await service.findOneBySlug('nonexistant-slug'),
    ).rejects.toThrow();
  });

  it('should return 5', async () => {
    const result = await service.getAvailableSeats(
      INSERTED_PRODUCT_IDENTIFIERS[0].id,
    );

    expect(result).toEqual(5);
  });

  it(`should reject promise since product with id "nonexistant-id" doesn't exist`, async () => {
    await expect(
      async () => await service.getAvailableSeats('nonexistant-id'),
    ).rejects.toThrow();
  });
});

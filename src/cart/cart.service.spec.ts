import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmMemoryDBTestingModule } from '../test-utils/typeorm.memorydb.module';
import { CartService } from './cart.service';
import { ObjectLiteral, Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { Product } from '../product/entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { products } from '../entities.seed';
import { NewCartInput } from './dto/new-cart.input';
import { BadRequestException } from '@nestjs/common';

describe('Cart Service', () => {
  let service: CartService;
  let cartRepository: Repository<Cart>;
  let productRepository: Repository<Product>;

  const CART_REPOSITORY_TOKEN = getRepositoryToken(Cart);
  const PRODUCT_REPOSITORY_TOKEN = getRepositoryToken(Product);

  let INSERTED_PRODUCT_IDENTIFIERS: ObjectLiteral[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmMemoryDBTestingModule()],
      providers: [CartService],
      exports: [...TypeOrmMemoryDBTestingModule()],
    }).compile();

    service = module.get<CartService>(CartService);
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

  it('should create a cart', async () => {
    const newCartInput: NewCartInput = {
      productId: INSERTED_PRODUCT_IDENTIFIERS[0].id,
      travelerEmail: 'email@example.com',
      travelerAmount: 3,
    };
    const result = await service.create(newCartInput);

    expect(result).toMatchObject({
      travelerEmail: newCartInput.travelerEmail,
      travelerAmount: newCartInput.travelerAmount,
      isPaid: false,
    });
    expect(result).toHaveProperty('id');

    const now = new Date().getTime();
    expect(result.expiresAt.getTime()).toBeGreaterThan(now);
  });

  it(`should reject promise since product with id "nonexistant-id" doesn't exist`, async () => {
    const newCartInput: NewCartInput = {
      productId: 'nonexistant-id',
      travelerEmail: 'email@example.com',
      travelerAmount: 5,
    };

    await expect(
      async () => await service.create(newCartInput),
    ).rejects.toThrow();
  });

  it('should throw a BadRequestException if too many seats (999999) are being requested', async () => {
    const newCartInput: NewCartInput = {
      productId: INSERTED_PRODUCT_IDENTIFIERS[0].id,
      travelerEmail: 'email@example.com',
      travelerAmount: 999999,
    };

    await expect(
      async () => await service.create(newCartInput),
    ).rejects.toThrow(BadRequestException);
  });

  it('should set cart isPaid to true when cart is not expired', async () => {
    // inserting the cart record
    const newCartInput: NewCartInput = {
      productId: INSERTED_PRODUCT_IDENTIFIERS[0].id,
      travelerEmail: 'email@example.com',
      travelerAmount: 3,
    };
    const cart = await service.create(newCartInput);

    const result = await service.setAsPaid(cart.id);

    expect(result).toEqual(true);

    // jest.useFakeTimers().setSystemTime(new Date(new Date().getTime() + 16 * 60000)); // add 16 min to system time
  });

  it('should not set cart isPaid to true when cart is expired', async () => {
    // inserting the cart record
    const newCartInput: NewCartInput = {
      productId: INSERTED_PRODUCT_IDENTIFIERS[0].id,
      travelerEmail: 'email@example.com',
      travelerAmount: 3,
    };
    const cart = await service.create(newCartInput);

    jest
      .useFakeTimers()
      .setSystemTime(new Date(new Date().getTime() + 16 * 60000)); // add 16 min to system time

    const result = await service.setAsPaid(cart.id);

    expect(result).toEqual(false);
  });

  it('should not set cart isPaid to true when cart already has isPaid', async () => {
    // inserting the cart record
    const newCartInput: NewCartInput = {
      productId: INSERTED_PRODUCT_IDENTIFIERS[0].id,
      travelerEmail: 'email@example.com',
      travelerAmount: 3,
    };
    const cart = await service.create(newCartInput);

    const result = await service.setAsPaid(cart.id);

    expect(result).toEqual(true);

    const resultSecondTry = await service.setAsPaid(cart.id);
    expect(resultSecondTry).toEqual(false);
  });

  it('should reject promise since cart with id "nonexistant-id" doesn\'t exist', async () => {
    await expect(
      async () => await service.findOneById('nonexistant-id'),
    ).rejects.toThrow();
  });
});

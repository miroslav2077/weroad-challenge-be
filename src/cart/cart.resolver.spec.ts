import { Test, TestingModule } from '@nestjs/testing';
import { Cart } from './entities/cart.entity';
import { Product } from '../product/entities/product.entity';
import { CartResolver } from './cart.resolver';
import { CartService } from './cart.service';
import { NewCartInput } from './dto/new-cart.input';
import { BadRequestException } from '@nestjs/common';

const mockProduct: Product = {
  id: 'bf9f9e18-3c71-4e5c-a78a-5fa30c18e85f',
  slug: 'mock-product',
  name: 'Mock Product',
  description: 'The description of a mock product is nonsensical',
  startingDate: new Date('December 17, 1995 00:00:00'),
  endingDate: new Date('December 28, 1995 00:00:00'),
  price: 149900,
  totalSeats: 5,
  nature: 10,
  relax: 20,
  history: 80,
  culture: 60,
  party: 11,
  imageUrl: 'https://example.com/mock-product.png',
  carts: [],
};
const mockCart: Cart = {
  id: 'f5b895e9-40ef-483b-8edd-28cf656cce8d',
  createdAt: new Date('December 17, 1995 03:24:00'),
  updatedAt: null,
  expiresAt: new Date('December 17, 1995 03:39:00'),
  travelerEmail: 'test@gmail.com',
  travelerAmount: 3,
  unitPrice: 149900,
  product: mockProduct,
  isPaid: false,
  totalAmount: 449700,
};

const cartServiceMock = {
  findOneById: jest.fn((id: string): Cart => structuredClone(mockCart)), // avoid comparing reference of passed object with itself later in the test
  create: jest.fn((data: NewCartInput): Cart => structuredClone(mockCart)),
  setAsPaid: jest.fn((id: string): boolean =>
    id === 'f5b895e9-40ef-483b-8edd-28cf656cce8d' ? true : false,
  ),
};

describe('Cart Resolver', () => {
  let resolver: CartResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartResolver,
        { provide: CartService, useValue: cartServiceMock },
      ],
    }).compile();

    resolver = module.get<CartResolver>(CartResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should query for a single cart item', async () => {
    const result = await resolver.cart('f5b895e9-40ef-483b-8edd-28cf656cce8d');
    expect(result.id).toEqual('f5b895e9-40ef-483b-8edd-28cf656cce8d');
  });

  it('should create a new cart', async () => {
    const newCartInput: NewCartInput = {
      productId: mockProduct.id,
      travelerEmail: mockCart.travelerEmail,
      travelerAmount: mockCart.travelerAmount,
    };
    const result = await resolver.addCart(newCartInput);

    expect(result).toEqual(mockCart);
  });

  it('should return true', async () => {
    const result = await resolver.setAsPaid(
      'f5b895e9-40ef-483b-8edd-28cf656cce8d',
    );
    expect(result).toEqual(true);
  });

  it('should throw a bad request exception if false is returned', async () => {
    const id = 'f5b895e9-40ef-483b-8edd-eowijosdjofs';
    await expect(async () => await resolver.setAsPaid(id)).rejects.toThrow(
      BadRequestException,
    );
  });
});

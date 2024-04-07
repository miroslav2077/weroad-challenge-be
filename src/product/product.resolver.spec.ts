import { Test, TestingModule } from '@nestjs/testing';
import { Product } from '../product/entities/product.entity';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';

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

const productServiceMock = {
  findOneById: jest.fn((id: string): Product => structuredClone(mockProduct)), // avoid comparing reference of passed object with itself later in the test
  findOneBySlug: jest.fn(
    (slug: string): Product => structuredClone(mockProduct),
  ),
  findAll: jest.fn((id: string): Product[] => [
    structuredClone(mockProduct),
    structuredClone(mockProduct),
  ]),
  getAvailableSeats: jest.fn((id: string): number => 5),
};

describe('Cart Resolver', () => {
  let resolver: ProductResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductResolver,
        { provide: ProductService, useValue: productServiceMock },
      ],
    }).compile();

    resolver = module.get<ProductResolver>(ProductResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return a single product item', async () => {
    const result = await resolver.product(mockProduct.id);
    expect(result.id).toEqual(mockProduct.id);
  });

  it('should return a single product item from slug', async () => {
    const result = await resolver.productBySlug(mockProduct.slug);
    expect(result.slug).toEqual(mockProduct.slug);
  });

  it('should return a list of products', async () => {
    const result = await resolver.products();
    expect(result).toHaveLength(2);
  });

  it('should return number of available seats', async () => {
    const result = await resolver.availableSeats(mockProduct.id);
    expect(result).toEqual(5);
  });
});

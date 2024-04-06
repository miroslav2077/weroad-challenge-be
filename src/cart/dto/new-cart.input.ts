import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewCartInput {
  @Field(type => ID!)
  productId: string;

  @Field()
  @Length(7, 255)
  travelerEmail: string;

  @Field(type => Int)
  travelerAmount: number;
}

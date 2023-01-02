import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsNotEmpty()
  @ApiProperty({ example: 10 })
  readonly amount: number;

  @IsNotEmpty()
  @ApiProperty({ example: 'John Doe' })
  readonly username: string;
}

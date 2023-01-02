import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @ApiProperty({ example: 10 })
  readonly amount: number;

  @IsNotEmpty()
  @ApiProperty({ example: 'John Doe' })
  readonly username: string;
}

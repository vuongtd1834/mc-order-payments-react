import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../enums/order-status.enum';

export class ResponseOrderDto {
  @ApiProperty({ example: 1 })
  readonly id: number;

  @ApiProperty({ example: 10 })
  readonly amount: number;

  @ApiProperty({ example: 'John Doe' })
  readonly username: string;

  @ApiProperty({ example: OrderStatus.CREATED })
  readonly status: OrderStatus;

  @ApiProperty({ example: new Date() })
  readonly created_at: Date;

  @ApiProperty({ example: new Date() })
  readonly updated_at: Date;
}

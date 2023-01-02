import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ResponseOrderDto } from './dto/reponse-order.dto';
import { Order } from './entities/order.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create new order' })
  @ApiResponse({ status: 200, type: ResponseOrderDto })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, type: ResponseOrderDto, isArray: true })
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by id' })
  @ApiResponse({ status: 200, type: ResponseOrderDto })
  @ApiParam({ name: 'id', description: 'Order id', required: true })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update order by id' })
  @ApiResponse({ status: 200, type: ResponseOrderDto })
  @ApiParam({ name: 'id', description: 'Order id', required: true })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto
  ): Promise<Order> {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete order by id' })
  @ApiResponse({
    status: 200,
    description: 'Delete order successfully',
    type: DeleteResult
  })
  @ApiParam({ name: 'id', description: 'Order id', required: true })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.orderService.remove(id);
  }

  @Put(':id/cancel')
  @ApiOperation({ summary: 'Cancel order by id' })
  @ApiResponse({ status: 200, type: ResponseOrderDto })
  @ApiParam({ name: 'id', description: 'Order id', required: true })
  async cancel(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.orderService.cancel(id);
  }
}

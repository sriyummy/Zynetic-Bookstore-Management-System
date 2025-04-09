import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
  } from '@nestjs/common';
  import { BooksService } from './books.service';
  import { Query } from '@nestjs/common';
  import { CreateBookDto } from './dto/create-book.dto';
  import { UpdateBookDto } from './dto/update-book.dto';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
  
  @Controller('books')
  export class BooksController {
    constructor(private readonly booksService: BooksService) {}
  
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateBookDto) {
      return this.booksService.create(dto);
    }
  
    @Get()
    findAll(@Query() query: any) {
    return this.booksService.findAll(query);
    }


  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.booksService.findOne(id);
    }
  
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateBookDto) {
      return this.booksService.update(id, dto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.booksService.delete(id);
    }
  }
  
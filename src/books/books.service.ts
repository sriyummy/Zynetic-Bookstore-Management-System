import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = new this.bookModel(createBookDto);
    return book.save();
  }

  async findAll(query: any): Promise<Book[]> {
    const filter: any = {};
  
    if (query.author) {
      filter.author = { $regex: new RegExp(query.author, 'i') }; // case-insensitive
    }
  
    if (query.category) {
      filter.category = { $regex: new RegExp(query.category, 'i') };
    }
  
    if (query.rating) {
      filter.rating = Number(query.rating);
    }
  
    if (query.search) {
      filter.title = { $regex: new RegExp(query.search, 'i') };
    }
  
    return this.bookModel.find(filter);
  }
  

  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async update(id: string, updateDto: UpdateBookDto): Promise<Book> {
    const book = await this.bookModel.findByIdAndUpdate(id, updateDto, {
      new: true,
    });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async delete(id: string): Promise<Book> {
    const book = await this.bookModel.findByIdAndDelete(id);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }
}

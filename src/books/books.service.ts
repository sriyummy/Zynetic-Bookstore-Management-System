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

  async findAll(query: any): Promise<{ data: Book[]; total: number }> {
    const filter: any = {};
  
    if (query.author) {
      filter.author = { $regex: new RegExp(query.author, 'i') };
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
  
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
  
    const sort: any = {};
    if (query.sortBy) {
      const order = query.order === 'desc' ? -1 : 1;
      sort[query.sortBy] = order;
    }
  
    const [data, total] = await Promise.all([
      this.bookModel.find(filter).sort(sort).skip(skip).limit(limit),
      this.bookModel.countDocuments(filter),
    ]);
  
    return { data, total };
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

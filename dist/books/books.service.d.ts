import { Book, BookDocument } from './schemas/book.schema';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BooksService {
    private bookModel;
    constructor(bookModel: Model<BookDocument>);
    create(createBookDto: CreateBookDto): Promise<Book>;
    findAll(query: any): Promise<Book[]>;
    findOne(id: string): Promise<Book>;
    update(id: string, updateDto: UpdateBookDto): Promise<Book>;
    delete(id: string): Promise<Book>;
}

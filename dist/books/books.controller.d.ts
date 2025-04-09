import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    create(dto: CreateBookDto): Promise<import("./schemas/book.schema").Book>;
    findAll(query: any): Promise<{
        data: import("./schemas/book.schema").Book[];
        total: number;
    }>;
    findOne(id: string): Promise<import("./schemas/book.schema").Book>;
    update(id: string, dto: UpdateBookDto): Promise<import("./schemas/book.schema").Book>;
    remove(id: string): Promise<import("./schemas/book.schema").Book>;
}

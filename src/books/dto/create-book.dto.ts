import {
    IsString,
    IsNotEmpty,
    IsNumber,
    Min,
    Max,
    IsDateString,
  } from 'class-validator';
  
  export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsNotEmpty()
    author: string;
  
    @IsString()
    @IsNotEmpty()
    category: string;
  
    @IsNumber()
    @Min(0)
    price: number;
  
    @IsNumber()
    @Min(0)
    @Max(5)
    rating: number;
  
    @IsDateString()
    publishedDate: string;
  }
  
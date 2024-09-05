import { IsNotEmpty } from 'class-validator'
export class CreateBookDto {
  @IsNotEmpty()
  bookName: string

  @IsNotEmpty()
  author: string

  description: string
  coverImg: string
}

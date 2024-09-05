import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { CreateBookDto } from './dto/create-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'
import { DBService } from 'src/db/db.services'
import { Book } from './entities/book.entity'

function randomId() {
  return Math.floor(Math.random() * 1000000).toString()
}

@Injectable()
export class BookService {
  @Inject(DBService)
  dbService: DBService

  async create(createBookDto: CreateBookDto) {
    const { bookName, author, description, coverImg } = createBookDto

    const book = new Book()
    book.id = randomId()
    book.bookName = bookName
    book.author = author
    book.description = description
    book.coverImage = coverImg

    const books: Book[] = await this.dbService.read()

    if (books.find(book => book.bookName === bookName)) {
      throw new BadRequestException('Book already exists')
    }

    books.push(book)

    await this.dbService.write(books)

    return book
  }

  async findAll() {
    const books: Book[] = await this.dbService.read()

    return books
  }

  async findOne(id: string) {
    const books: Book[] = await this.dbService.read()
    const book = books.find(book => book.id === id)
    return book
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const books: Book[] = await this.dbService.read()

    const book = books.find(book => book.id === id)

    if (!book) {
      throw new BadRequestException('Book not found')
    }

    book.bookName = updateBookDto.bookName
    book.author = updateBookDto.author
    book.description = updateBookDto.description
    book.coverImage = updateBookDto.coverImg

    await this.dbService.write(books)

    return book
  }

  async remove(id: string) {
    const books: Book[] = await this.dbService.read()

    const index = books.findIndex(book => book.id === id)

    if (index < 0) {
      throw new BadRequestException('Book not found')
    }

    books.splice(index, 1)

    await this.dbService.write(books)
  }
}

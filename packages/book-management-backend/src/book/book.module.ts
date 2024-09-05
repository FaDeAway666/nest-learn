import { Module } from '@nestjs/common'
import { BookService } from './book.service'
import { BookController } from './book.controller'
import { DBModule } from 'src/db/db.module'

@Module({
  imports: [
    DBModule.register({
      path: 'book.json',
    }),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}

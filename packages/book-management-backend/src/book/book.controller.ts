import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common'
import { BookService } from './book.service'
import { CreateBookDto } from './dto/create-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import storage from './file-storage'

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('create')
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto)
  }

  @Get('list')
  findAll() {
    return this.bookService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id)
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    console.log('updateBookDto', updateBookDto)
    return this.bookService.update(id, updateBookDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id)
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads',
      storage: storage,
      limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
      },
      fileFilter(req, file, callback) {
        console.log(file, 'filefilter')
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return callback(new Error('Only image files are allowed!'), false)
        }
        callback(null, true)
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file)
    return file.path
  }
}

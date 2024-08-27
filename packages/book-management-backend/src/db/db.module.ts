import { Module } from '@nestjs/common'
import { DBService } from './db.services'

export interface DBModuleOptions {
  path: string
}

@Module({})
export class DBModule {
  static register(options: DBModuleOptions) {
    return {
      module: DBModule,
      providers: [
        DBService,
        {
          provide: 'OPTIONS',
          useValue: options,
        },
      ],
      exports: [DBService],
    }
  }
}

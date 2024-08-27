import { Injectable, Inject } from '@nestjs/common'
import { DBModuleOptions } from './db.module'
import { access, readFile, writeFile } from 'fs/promises'
import { User } from 'src/user/entity/user.entity'

@Injectable()
export class DBService {
  @Inject('OPTIONS')
  private options: DBModuleOptions

  async read() {
    const path = this.options.path

    try {
      await access(path)
    } catch {
      return []
    }

    const str = await readFile(path, 'utf-8')

    if (!str) {
      return []
    }

    return JSON.parse(str) as User[]
  }

  async write(data: Record<string, any>) {
    try {
      await writeFile(this.options.path, JSON.stringify(data), 'utf-8')
    } catch (e) {
      console.log(e)
    }
  }
}

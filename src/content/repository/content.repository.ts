import { DataSource } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { Content } from 'src/content/entity'
import { TABLES } from 'src/database/tables'

@Injectable()
export class ContentRepository {
  constructor(private readonly dataSource: DataSource) {}

  async findOne(contentId: string): Promise<Content | null> {
    const [content] = await this.dataSource.query<Content[]>(
      `SELECT * FROM ${TABLES.CONTENTS} WHERE id = $1 AND deleted_at IS NULL LIMIT 1`,
      [contentId],
    )

    return content || null
  }
}

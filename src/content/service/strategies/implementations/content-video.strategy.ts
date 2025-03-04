import * as path from 'path'
import { Injectable } from '@nestjs/common'
import { ContentStrategy } from '../content-interface.strategy'
import { ProvisionDto } from '../../../dto'
import { Content } from '../../../entity'

@Injectable()
export class VideoStrategy implements ContentStrategy {
  provision(content: Content, url: string, bytes: number): ProvisionDto {
    return {
      id: content.id,
      title: content.title,
      cover: content.cover,
      created_at: content.created_at,
      description: content.description,
      total_likes: content.total_likes,
      type: 'video',
      url,
      allow_download: false,
      is_embeddable: true,
      format: path.extname(content.url || '').slice(1) || 'mp4',
      bytes,
      metadata: { duration: Math.floor(bytes / 100000) || 10, resolution: '1080p' },
    }
  }
}

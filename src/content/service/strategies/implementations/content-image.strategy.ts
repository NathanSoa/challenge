import * as path from 'path'
import { Injectable } from '@nestjs/common'
import { ContentStrategy } from '../content-interface.strategy'
import { ProvisionDto } from '../../../dto'
import { Content } from '../../../entity'

@Injectable()
export class ImageStrategy implements ContentStrategy {
  provision(content: Content, url: string, bytes: number): ProvisionDto {
    return {
      id: content.id,
      title: content.title,
      cover: content.cover,
      created_at: content.created_at,
      description: content.description,
      total_likes: content.total_likes,
      type: 'image',
      url,
      allow_download: true,
      is_embeddable: true,
      format: path.extname(content.url || '').slice(1) || 'jpg',
      bytes,
      metadata: { resolution: '1920x1080', aspect_ratio: '16:9' },
    }
  }
}

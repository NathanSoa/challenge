import { Injectable } from '@nestjs/common'
import { ContentStrategy } from '../content-interface.strategy'
import { ProvisionDto } from '../../../dto'
import { Content } from '../../../entity'

@Injectable()
export class LinkStrategy implements ContentStrategy {
  provision(content: Content): ProvisionDto {
    return {
      id: content.id,
      title: content.title,
      cover: content.cover,
      created_at: content.created_at,
      description: content.description,
      total_likes: content.total_likes,
      type: 'link',
      url: content.url || 'http://default.com',
      allow_download: false,
      is_embeddable: true,
      format: null,
      bytes: 0,
      metadata: { trusted: content.url?.includes('https') || false },
    }
  }
}

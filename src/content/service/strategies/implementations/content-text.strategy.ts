import { Injectable } from '@nestjs/common'
import { ContentStrategy } from '../content-interface.strategy'
import { ProvisionDto } from 'src/content/dto'
import { Content } from 'src/content/entity'

@Injectable()
export class TextStrategy implements ContentStrategy {
  provision(content: Content, generatedUrl: string, bytes: number): ProvisionDto {
    return {
      id: content.id,
      title: content.title,
      cover: content.cover,
      created_at: content.created_at,
      description: content.description,
      total_likes: content.total_likes,
      type: 'text',
      url: generatedUrl,
      allow_download: false,
      is_embeddable: false,
      format: 'text/plain',
      bytes,
      metadata: { trusted: true },
    }
  }
}

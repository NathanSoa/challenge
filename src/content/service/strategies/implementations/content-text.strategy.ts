import { Injectable } from '@nestjs/common'
import { ContentStrategy } from '../content-interface.strategy'
import { ProvisionDto } from 'src/content/dto'
import { Content } from 'src/content/entity'
import { createBaseInfo } from '../helper'

@Injectable()
export class TextStrategy implements ContentStrategy {
  provision(content: Content, url: string, bytes: number): ProvisionDto {
    const base = createBaseInfo(content, url, bytes)

    return {
      ...base,
      type: 'text',
      allow_download: false,
      is_embeddable: false,
      format: 'text/plain',
      metadata: { trusted: true },
    }
  }
}

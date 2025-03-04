import { Injectable } from '@nestjs/common'
import { ContentStrategy } from '../content-interface.strategy'
import { ProvisionDto } from '../../../dto'
import { Content } from '../../../entity'
import { createBaseInfo } from '../helper'

@Injectable()
export class LinkStrategy implements ContentStrategy {
  provision(content: Content, url: string, bytes: number): ProvisionDto {
    const base = createBaseInfo(content, url, bytes)

    return {
      ...base,
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

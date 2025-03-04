import * as path from 'path'
import { Injectable } from '@nestjs/common'
import { ContentStrategy } from '../content-interface.strategy'
import { ProvisionDto } from '../../../dto'
import { Content } from '../../../entity'
import { createBaseInfo } from '../helper'

@Injectable()
export class ImageStrategy implements ContentStrategy {
  provision(content: Content, url: string, bytes: number): ProvisionDto {
    const base = createBaseInfo(content, url, bytes)

    return {
      ...base,
      type: 'image',
      allow_download: true,
      is_embeddable: true,
      format: path.extname(content.url || '').slice(1) || 'jpg',
      metadata: { resolution: '1920x1080', aspect_ratio: '16:9' },
    }
  }
}

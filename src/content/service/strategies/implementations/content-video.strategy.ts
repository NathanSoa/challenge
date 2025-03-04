import * as path from 'path'
import { Injectable } from '@nestjs/common'
import { ContentStrategy } from '../content-interface.strategy'
import { ProvisionDto } from '../../../dto'
import { Content } from '../../../entity'
import { createBaseInfo } from '../helper'

@Injectable()
export class VideoStrategy implements ContentStrategy {
  provision(content: Content, url: string, bytes: number): ProvisionDto {
    const base = createBaseInfo(content, url, bytes)

    return {
      ...base,
      type: 'video',
      allow_download: false,
      is_embeddable: true,
      format: path.extname(content.url || '').slice(1) || 'mp4',
      metadata: { duration: Math.floor(bytes / 100000) || 10, resolution: '1080p' },
    }
  }
}

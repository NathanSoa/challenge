import { Injectable } from '@nestjs/common'
import { ContentStrategy } from '../content-interface.strategy'
import { ProvisionDto } from '../../../dto'
import { Content } from '../../../entity'
import { createBaseInfo } from '../helper'

@Injectable()
export class PdfStrategy implements ContentStrategy {
  provision(content: Content, url: string, bytes: number): ProvisionDto {
    const base = createBaseInfo(content, url, bytes)

    return {
      ...base,
      type: 'pdf',
      allow_download: true,
      is_embeddable: false,
      format: 'pdf',
      metadata: {
        author: 'Unknown',
        pages: Math.floor(bytes / 50000) || 1,
        encrypted: false,
      },
    }
  }
}

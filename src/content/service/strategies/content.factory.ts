import { Injectable } from '@nestjs/common'
import { ContentStrategy } from './content-interface.strategy'
import {
  PdfStrategy,
  ImageStrategy,
  LinkStrategy,
  VideoStrategy,
  TextStrategy,
} from './implementations'

@Injectable()
export class ContentStrategyFactory {
  private readonly strategies: Map<string, ContentStrategy>

  constructor(
    pdfStrategy: PdfStrategy,
    imageStrategy: ImageStrategy,
    videoStrategy: VideoStrategy,
    linkStrategy: LinkStrategy,
    textStrategy: TextStrategy,
  ) {
    this.strategies = new Map()
    this.strategies.set('pdf', pdfStrategy)
    this.strategies.set('image', imageStrategy)
    this.strategies.set('video', videoStrategy)
    this.strategies.set('link', linkStrategy)
    this.strategies.set('text', textStrategy)
  }

  getStrategy(type: string): ContentStrategy | undefined {
    return this.strategies.get(type)
  }
}

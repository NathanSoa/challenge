import { Test, TestingModule } from '@nestjs/testing'
import { suite, test } from '@testdeck/jest'
import { ProvisionDto } from 'src/content/dto'
import { Content } from 'src/content/entity'
import { ImageStrategy } from 'src/content/service/strategies/implementations'

@suite
export class ImageStrategyUnitTest {
  private imageStrategy: ImageStrategy

  private readonly mockContent = (format?: string, url?: string): Content =>
    ({
      id: '4372ebd1-2ee8-4501-9ed5-549df46d0eb0',
      title: 'Test Image',
      description: 'Description for image',
      url: url || `http://localhost:3000/uploads/dummy.${format}`,
      created_at: new Date('2025-01-31T23:39:54.236Z'),
      total_likes: 10,
      type: 'image',
    }) as Content

  async before() {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageStrategy],
    }).compile()

    this.imageStrategy = module.get<ImageStrategy>(ImageStrategy)
  }

  @test
  async 'Should return provisioned Image content with specified format'() {
    const content = this.mockContent('png')
    const url = content.url
    const bytes = 20000

    const result: ProvisionDto = this.imageStrategy.provision(content, url, bytes)

    expect(result).toMatchObject({
      type: 'image',
      allow_download: true,
      is_embeddable: true,
      format: 'png',
      bytes: 20000,
      metadata: { resolution: '1920x1080', aspect_ratio: '16:9' },
    })
  }

  @test
  async 'Should return provisioned Image content with default format'() {
    const content = this.mockContent('')
    const url = content.url
    const bytes = 20000

    const result: ProvisionDto = this.imageStrategy.provision(content, url, bytes)

    expect(result).toMatchObject({
      type: 'image',
      allow_download: true,
      is_embeddable: true,
      format: 'jpg',
      bytes: 20000,
      metadata: { resolution: '1920x1080', aspect_ratio: '16:9' },
    })
  }

  @test
  async 'Should handle edge case with missing URL'() {
    const content = this.mockContent('', '')
    const url = content.url
    const bytes = 20000

    const result: ProvisionDto = this.imageStrategy.provision(content, url, bytes)

    expect(result).toMatchObject({
      type: 'image',
      allow_download: true,
      is_embeddable: true,
      format: 'jpg',
      bytes: 20000,
      metadata: { resolution: '1920x1080', aspect_ratio: '16:9' },
    })
  }
}

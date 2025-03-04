import { Test, TestingModule } from '@nestjs/testing'
import { suite, test } from '@testdeck/jest'
import { ProvisionDto } from 'src/content/dto'
import { Content } from 'src/content/entity'
import { TextStrategy } from 'src/content/service/strategies/implementations'

@suite
export class TextStrategyUnitTest {
  private textStrategy: TextStrategy

  private readonly mockContent = (url?: string): Content =>
    ({
      id: '4372ebd1-2ee8-4501-9ed5-549df46d0eb0',
      title: 'Test Text',
      description: 'Description for text',
      url: url || `http://localhost:3000/uploads/dummy.txt`,
      created_at: new Date('2025-01-31T23:39:54.236Z'),
      total_likes: 10,
      type: 'text',
    }) as Content

  async before() {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TextStrategy],
    }).compile()

    this.textStrategy = module.get<TextStrategy>(TextStrategy)
  }

  @test
  async 'Should return provisioned Text content with specified URL'() {
    const content = this.mockContent('http://localhost:3000/uploads/dummy.txt')
    const url = content.url
    const bytes = 5000

    const result: ProvisionDto = this.textStrategy.provision(content, url, bytes)

    expect(result).toMatchObject({
      type: 'text',
      allow_download: false,
      is_embeddable: false,
      format: 'text/plain',
      bytes: 5000,
      metadata: { trusted: true },
    })
  }

  @test
  async 'Should return provisioned Text content with default URL'() {
    const content = this.mockContent()
    const url = content.url
    const bytes = 5000

    const result: ProvisionDto = this.textStrategy.provision(content, url, bytes)

    expect(result).toMatchObject({
      type: 'text',
      allow_download: false,
      is_embeddable: false,
      format: 'text/plain',
      bytes: 5000,
      metadata: { trusted: true },
    })
  }

  @test
  async 'Should handle edge case with missing URL'() {
    const content = this.mockContent('')
    const url = content.url
    const bytes = 5000

    const result: ProvisionDto = this.textStrategy.provision(content, url, bytes)

    expect(result).toMatchObject({
      type: 'text',
      allow_download: false,
      is_embeddable: false,
      format: 'text/plain',
      bytes: 5000,
      metadata: { trusted: true },
    })
  }
}

import { Test, TestingModule } from '@nestjs/testing'
import { suite, test } from '@testdeck/jest'
import { ProvisionDto } from 'src/content/dto'
import { Content } from 'src/content/entity'
import { LinkStrategy } from 'src/content/service/strategies/implementations'

@suite
export class LinkStrategyUnitTest {
  private linkStrategy: LinkStrategy

  private readonly mockContent = (url?: string): Content =>
    ({
      id: '4372ebd1-2ee8-4501-9ed5-549df46d0eb0',
      title: 'Test Link',
      description: 'Description for link',
      url: url || `http://localhost:3000/uploads/dummy`,
      created_at: new Date('2025-01-31T23:39:54.236Z'),
      total_likes: 10,
      type: 'link',
    }) as Content

  async before() {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinkStrategy],
    }).compile()

    this.linkStrategy = module.get<LinkStrategy>(LinkStrategy)
  }

  @test
  async 'Should return provisioned Link content with specified URL'() {
    const content = this.mockContent('http://localhost:3000/uploads/dummy')
    const url = content.url
    const bytes = 0

    const result: ProvisionDto = this.linkStrategy.provision(content, url, bytes)

    expect(result).toMatchObject({
      type: 'link',
      url: 'http://localhost:3000/uploads/dummy',
      allow_download: false,
      is_embeddable: true,
      format: null,
      bytes: 0,
      metadata: { trusted: false },
    })
  }

  @test
  async 'Should return provisioned Link content with default URL'() {
    const content = this.mockContent()
    const url = content.url
    const bytes = 0

    const result: ProvisionDto = this.linkStrategy.provision(content, url, bytes)

    expect(result).toMatchObject({
      type: 'link',
      url: 'http://localhost:3000/uploads/dummy',
      allow_download: false,
      is_embeddable: true,
      format: null,
      bytes: 0,
      metadata: { trusted: false },
    })
  }

  @test
  async 'Should handle edge case with missing URL'() {
    const content = this.mockContent('')
    const url = content.url
    const bytes = 0

    const result: ProvisionDto = this.linkStrategy.provision(content, url, bytes)

    expect(result).toMatchObject({
      type: 'link',
      url: 'http://default.com',
      allow_download: false,
      is_embeddable: true,
      format: null,
      bytes: 0,
      metadata: { trusted: false },
    })
  }
}

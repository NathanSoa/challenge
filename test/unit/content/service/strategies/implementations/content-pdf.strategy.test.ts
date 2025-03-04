import { Test, TestingModule } from '@nestjs/testing'
import { suite, test } from '@testdeck/jest'
import { ProvisionDto } from 'src/content/dto'
import { Content } from 'src/content/entity'
import { PdfStrategy } from 'src/content/service/strategies/implementations'

@suite
export class PdfStrategyUnitTest {
  private pdfStrategy: PdfStrategy

  private readonly mockContent = (url?: string): Content =>
    ({
      id: '4372ebd1-2ee8-4501-9ed5-549df46d0eb0',
      title: 'Test PDF',
      description: 'Description for PDF',
      url: url || `http://localhost:3000/uploads/dummy.pdf`,
      created_at: new Date('2025-01-31T23:39:54.236Z'),
      total_likes: 10,
      type: 'pdf',
    }) as Content

  async before() {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdfStrategy],
    }).compile()

    this.pdfStrategy = module.get<PdfStrategy>(PdfStrategy)
  }

  @test
  async 'Should return provisioned PDF content with specified URL'() {
    const content = this.mockContent('http://localhost:3000/uploads/dummy.pdf')
    const url = content.url
    const bytes = 100000

    const result: ProvisionDto = this.pdfStrategy.provision(content, url, bytes)

    expect(result).toMatchObject({
      type: 'pdf',
      allow_download: true,
      is_embeddable: false,
      format: 'pdf',
      bytes: 100000,
      metadata: {
        author: 'Unknown',
        pages: 2,
        encrypted: false,
      },
    })
  }

  @test
  async 'Should return provisioned PDF content with default URL'() {
    const content = this.mockContent()
    const url = content.url
    const bytes = 100000

    const result: ProvisionDto = this.pdfStrategy.provision(content, url, bytes)

    expect(result).toMatchObject({
      type: 'pdf',
      allow_download: true,
      is_embeddable: false,
      format: 'pdf',
      bytes: 100000,
      metadata: {
        author: 'Unknown',
        pages: 2,
        encrypted: false,
      },
    })
  }

  @test
  async 'Should handle edge case with missing URL'() {
    const content = this.mockContent('')
    const url = content.url
    const bytes = 100000

    const result: ProvisionDto = this.pdfStrategy.provision(content, url, bytes)

    expect(result).toMatchObject({
      type: 'pdf',
      allow_download: true,
      is_embeddable: false,
      format: 'pdf',
      bytes: 100000,
      metadata: {
        author: 'Unknown',
        pages: 2,
        encrypted: false,
      },
    })
  }
}

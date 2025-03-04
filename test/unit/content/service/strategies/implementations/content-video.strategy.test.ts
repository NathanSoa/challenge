import { Test, TestingModule } from '@nestjs/testing'
import { suite, test } from '@testdeck/jest'
import { ProvisionDto } from 'src/content/dto'
import { Content } from 'src/content/entity'
import { VideoStrategy } from 'src/content/service/strategies/implementations'

@suite
export class VideoStrategyUnitTest {
  private videoStrategy: VideoStrategy

  private readonly mockContent = (url?: string): Content =>
    ({
      id: '4372ebd1-2ee8-4501-9ed5-549df46d0eb0',
      title: 'Test Video',
      description: 'Description for video',
      url: url || `http://localhost:3000/uploads/dummy.mp4`,
      created_at: new Date('2025-01-31T23:39:54.236Z'),
      total_likes: 10,
      type: 'video',
    }) as Content

  async before() {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoStrategy],
    }).compile()

    this.videoStrategy = module.get<VideoStrategy>(VideoStrategy)
  }

  @test
  async 'Should return provisioned Video content with specified URL'() {
    const content = this.mockContent('http://localhost:3000/uploads/dummy.mp4')
    const url = content.url
    const bytes = 500000

    const result: ProvisionDto = this.videoStrategy.provision(content, url, bytes)

    expect(result).toMatchObject({
      type: 'video',
      allow_download: false,
      is_embeddable: true,
      format: 'mp4',
      bytes: 500000,
      metadata: {
        duration: 5,
        resolution: '1080p',
      },
    })
  }

  @test
  async 'Should return provisioned Video content with default URL'() {
    const content = this.mockContent()
    const url = content.url
    const bytes = 500000

    const result: ProvisionDto = this.videoStrategy.provision(content, url, bytes)

    expect(result).toMatchObject({
      type: 'video',
      allow_download: false,
      is_embeddable: true,
      format: 'mp4',
      bytes: 500000,
      metadata: {
        duration: 5,
        resolution: '1080p',
      },
    })
  }

  @test
  async 'Should handle edge case with missing URL'() {
    const content = this.mockContent('')
    const url = content.url
    const bytes = 500000

    const result: ProvisionDto = this.videoStrategy.provision(content, url, bytes)

    expect(result).toMatchObject({
      type: 'video',
      allow_download: false,
      is_embeddable: true,
      format: 'mp4',
      bytes: 500000,
      metadata: {
        duration: 5,
        resolution: '1080p',
      },
    })
  }
}

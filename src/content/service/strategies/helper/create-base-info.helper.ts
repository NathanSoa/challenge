import { ProvisionDto } from '../../../dto'
import { Content } from '../../../entity'

type BaseInfoDto = Pick<
  ProvisionDto,
  'id' | 'title' | 'cover' | 'created_at' | 'description' | 'total_likes' | 'url' | 'bytes'
>

export const createBaseInfo = (content: Content, url: string, bytes: number): BaseInfoDto => {
  return {
    id: content.id,
    title: content.title,
    cover: content.cover,
    created_at: content.created_at,
    description: content.description,
    total_likes: content.total_likes,
    url,
    bytes,
  }
}

import { Content } from '../../entity'
import { ProvisionDto } from '../../dto'

export interface ContentStrategy {
  provision(content: Content, generatedUrl: string, bytes: number): ProvisionDto
}

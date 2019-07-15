export interface FlockExpoConfig {
}

export interface ExpoConfig {
}

export interface SendPushFlockRequest {
  to: string | string[]
  data?: object
  title?: string
  body?: string
  ttl?: number
  expiration: number
  priority?: 'default' | 'normal' | 'high'
  badge?: number
  sound?: string
  channelId?: string
}

export interface SendPushExpoRequest {
  to: string
  data?: object
  title?: string
  body?: string
  ttl?: number
  expiration: number
  priority?: 'default' | 'normal' | 'high'
  badge?: number
  sound?: string
  channelId?: string
}

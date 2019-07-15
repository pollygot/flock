export interface FacebookConfig {
  access_token: string
  verify_token: string
  app_secret: string
}

export interface SendToFeedFlockRequest {
  feedId: string
  message: string
}

export interface SendToFeedFacebookRequest {
  feed_id: string
  message: string
}

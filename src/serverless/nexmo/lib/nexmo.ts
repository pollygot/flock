export interface FlockNexmoConfig {
  nexmoApiKey: string
  nexmoApiSecret: string
}

export interface NexmoConfig {
  api_key: string
  api_secret: string
}

export interface SendSmsFlockRequest {
  to: string
  from: string
  text: string
}

export interface SendSmsNexmoRequest {
  to: string
  from: string
  text: string
}

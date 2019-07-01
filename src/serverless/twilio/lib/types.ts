export interface GenericResponse {
  statusCode: number
  body: string
}

export interface SendSms {
  from: string
  to: string | string[]
  body: string
}

export interface TwilioSmsRequest {
  from: string
  to: string
  body: string
}

export interface TwilioConfig {
  accountSid: string
  token: string
}

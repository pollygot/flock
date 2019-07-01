export interface GenericResponse {
  statusCode: number
  body: string
}

export interface SendEmail {
  from: string
  to: string
  subject: string
  text: string
  recipientVariables?: object
}

export interface MailgunSendEmailRequest {
  from: string
  to: string
  subject: string
  text: string
  'recipient-variables'?: object
}

export interface MailgunConfig {
  apiKey: string
  domain: string
}
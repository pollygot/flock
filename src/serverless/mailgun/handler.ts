import { Handler, APIGatewayProxyEvent, Context, Callback } from 'aws-lambda'
import { GenericResponse, SendEmail, MailgunSendEmailRequest, MailgunConfig } from './lib/types'
import mailgun from 'mailgun-js'

const sendEmail: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback
) => {
  try {
    let body: any = JSON.parse(event.body || '')
    let apiKey = body.config.mailgunApiKey
    let domain = body.config.mailgunDomain
    let config: MailgunConfig = { apiKey, domain }
    let payload: SendEmail = body.payload

    const client = mailgun(config)

    // Send the messages
    let data: MailgunSendEmailRequest = {
      from: payload.from,
      to: payload.to,
      subject: payload.subject,
      text: payload.text
    }
    if (payload.recipientVariables) data['recipient-variables'] = payload.recipientVariables

    await sendMailgunEmail(client, data)
    return sendSuccess()
  } catch (error) {
    return sendFatalError(error)
  }
}

export { sendEmail }

const sendFatalError = (error: any) => {
  console.log('Error: ', error)
  // Tell caller there was an error
  const response: GenericResponse = {
    statusCode: 500,
    body: JSON.stringify({ message: 'Error sending message' }),
  }
  return response
}

const sendSuccess = () => {
  const response: GenericResponse = {
    statusCode: 200,
    body: JSON.stringify({ message: 'Message Sent' }),
  }
  return response
}

function sendMailgunEmail(client: mailgun.Mailgun, data: MailgunSendEmailRequest) {
  return new Promise((resolve, reject) => {
    try {
      client.messages().send(data, (error, result) => {
        if (error) return reject(error)
        else return resolve(result)
      })
    } catch (error) {
      return reject(error)
    }
  })
}

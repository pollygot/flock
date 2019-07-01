import { Handler, APIGatewayProxyEvent, Context, Callback } from 'aws-lambda'
import { GenericResponse, TwilioConfig, TwilioSmsRequest } from './lib/types'
import twilio from 'twilio'

const sendSms: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback
) => {
  try {
    let body: any = JSON.parse(event.body || '')
    let config: TwilioConfig = body.config
    let message: TwilioSmsRequest = body.message
    console.log('config', config)

    const client = twilio(config.accountSid, config.token)

    // Send the message
    await client.messages.create(message)
    // Confirm sending to the caller
    const response: GenericResponse = {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message Sent' }),
    }
    return response
  } catch (error) {
    console.log('Error: ', error)
    // Tell caller there was an error
    const response: GenericResponse = {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending message' }),
    }
    return response
  }
}

export { sendSms }

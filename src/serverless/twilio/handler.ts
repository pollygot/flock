import { Handler, APIGatewayProxyEvent, Context, Callback } from 'aws-lambda'
import { GenericResponse, SendSms, TwilioConfig, TwilioSmsRequest } from './lib/types'
import twilio from 'twilio'

const sendSms: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback
) => {
  try {
    let body: any = JSON.parse(event.body || '')
    let accountSid = body.config.twilioAccountSid
    let token = body.config.twilioToken
    let config: TwilioConfig = { accountSid, token }
    let payload: SendSms = body.payload
    let twilioPromises: any = []

    const client = twilio(config.accountSid, config.token)

    // Send the messages
    if (!Array.isArray(payload.to)) payload.to = [payload.to]
    payload.to.forEach((num: string) => {
      let message: TwilioSmsRequest = {
        from: payload.from,
        to: num,
        body: payload.body,
      }
      twilioPromises.push(client.messages.create(message))
    })

    // Confirm success to the caller
    await Promise.all(twilioPromises)
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
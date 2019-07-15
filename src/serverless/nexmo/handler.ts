import { Handler, APIGatewayProxyEvent, Context, Callback } from 'aws-lambda'
import { FlockNexmoConfig, NexmoConfig, SendSmsFlockRequest, SendSmsNexmoRequest } from './lib/nexmo'
import { sendSuccess, sendFatalError } from './lib/helpers'
import axios from 'axios'

const NEXMO_URL = `https://rest.nexmo.com/sms/json`

const sendSms: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback
) => {
  try {
    let body: any = JSON.parse(event.body || '')
    let senderConfig:FlockNexmoConfig = body.config
    let api_key = senderConfig.nexmoApiKey
    let api_secret = senderConfig.nexmoApiSecret
    let config: NexmoConfig = { api_key, api_secret }

    // Send SMS
    let payload: SendSmsFlockRequest = body.payload
    let to = payload.to
    let from = payload.from
    let text = payload.text
    let data: SendSmsNexmoRequest = { to, from, text }
    await axios.post(NEXMO_URL, { ...config, ...data })
    
    // Return Success
    return sendSuccess()
  } catch (error) {
    // Return Error
    return sendFatalError(error)
  }
}
export { sendSms }

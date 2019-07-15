import { Handler, APIGatewayProxyEvent, Context, Callback } from 'aws-lambda'
import {  SendPushFlockRequest, SendPushExpoRequest } from './lib/expo'
import { sendSuccess, sendFatalError } from './lib/helpers'
import axios from 'axios'

const EXPO_URL = `https://exp.host/--/api/v2/push/send`

const sendSms: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback
) => {
  try {
    let body: any = JSON.parse(event.body || '')
    let payload: SendPushFlockRequest = body.payload
    let expoPromises: any = []

    // Send the messages
    if (!Array.isArray(payload.to)) payload.to = [payload.to]
    payload.to.forEach((token: string) => {
      let data: SendPushExpoRequest = {
        ...payload,
        to: token
      }
      expoPromises.push(axios.post(EXPO_URL, data))
    })
    
    // Return Success
    await Promise.all(expoPromises)
    return sendSuccess()
  } catch (error) {
    // Return Error
    return sendFatalError(error)
  }
}
export { sendSms }

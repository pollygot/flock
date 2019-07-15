import { Handler, APIGatewayProxyEvent, Context, Callback } from 'aws-lambda'
import { SendToFeedFlockRequest, SendToFeedFacebookRequest, FacebookConfig } from './lib/facebook.types'
import { sendSuccess, sendFatalError } from './lib/helpers'
import axios from 'axios'

const GRAPH_URL = `https://graph.facebook.com`

const sendToFeed: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback
) => {
  try {
    let body: any = JSON.parse(event.body || '')
    let access_token = body.config.facebookAccessToken
    let verify_token = body.config.facebookVerifyToken
    let app_secret = body.config.facebookAppSecret
    let config: FacebookConfig = { access_token, verify_token, app_secret }

    // Send to wall
    let payload: SendToFeedFlockRequest = body.payload
    let feed_id = payload.feedId
    let message = payload.message
    let data: SendToFeedFacebookRequest = { feed_id, message }
    let url = `${GRAPH_URL}/${feed_id}/feed`
    await axios.post(url, { ...config, ...data })
    
    // Return Success
    return sendSuccess()
  } catch (error) {
    // Return Error
    return sendFatalError(error)
  }
}
export { sendToFeed }

import { GenericResponse } from './serverless.types'

export const sendFatalError = (error: any) => {
  console.log('Error: ', error)
  // Tell caller there was an error
  const response: GenericResponse = {
    statusCode: 500,
    body: JSON.stringify({ message: 'Error sending message' }),
  }
  return response
}

export const sendSuccess = () => {
  const response: GenericResponse = {
    statusCode: 200,
    body: JSON.stringify({ message: 'Message Sent' }),
  }
  return response
}
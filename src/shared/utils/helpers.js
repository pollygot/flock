const logError = error => {
  
}

export const sendFatalError = error => {
  let statusCode = 500
  let message = 'An error occured'
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
    message = error.response.data
    statusCode = error.response.status
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
    message = error.message
  }
  console.log(error.config)
  
  // Tell caller there was an error
  const response = {
    statusCode,
    body: JSON.stringify({ message }),
  }
  return response
}

export const sendValidationErrors = error => {
  // console.log('Error: ', error)
  if (error.details != null && Array.isArray(error.details)) {
    let validation = error.details.map(x => {
      let key = x.path.join('.')
      return `${key}: ${x.message}`.replace(/"/g, "'")
    })
    const response = {
      statusCode: 400,
      body: JSON.stringify({ validation }),
    }
    return response
  } else {
    let message = error.message.replace(/"/g, "'")
    const response = {
      statusCode: 400,
      body: JSON.stringify({ message }),
    }
    return response
  }
}

export const sendSuccess = () => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({ message: 'Message Sent' }),
  }
  return response
}

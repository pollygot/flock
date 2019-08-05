var joi = require('joi')

module.exports = {
  twilioSendSms: {
    title: 'Expo Send Push',
    description: 'A RESTful API for interacting with Expo.',
    urlPath: '/expo/push/send',
    schema: joi.object({
      config: joi.object().keys({}),
      payload: joi.object().keys({
        to: joi.string().required(),
        title: joi.string().required(),
        body: joi.string(),
      })
    })
  }
}
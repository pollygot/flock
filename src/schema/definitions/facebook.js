var joi = require('joi')

module.exports = {
  twilioSendSms: {
    title: 'Facebook Send to Feed',
    description: 'A RESTful API for interacting with Facebook.',
    urlPath: '/facebook/feed/send',
    schema: joi.object({
      config: joi.object().keys({
        facebookAccessToken: joi.string().required(),
        facebookVerifyToken: joi.string().required(),
        facebookAppSecret: joi.string().required(),
      }),
      payload: joi.object().keys({
        feedId: joi.string().required(),
        message: joi.string().max(1000).required(),
      })
    })
  }
}
var joi = require('joi')

module.exports = {
  twilioSendSms: {
    title: 'Twilio Send SMS',
    description: 'Twilio is a service for sending SMS.',
    urlPath: '/twilio/sms/send',
    schema: joi.object({
      config: joi.object().keys({
        twilioAccountSid: joi.string().required(),
        twilioToken: joi.string().required(),
      }),
      payload: joi.object().keys({
        to: joi.number().required(),
        from: joi.string().required(),
        body: joi.string().required(),
      })
    })
  }
}
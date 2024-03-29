var joi = require('joi')

module.exports = {
  // Mailgun Send Email
  mailgunSendMail: {
    title: 'Mailgun Send Email',
    description: 'Mailgun is a service for sending transactional emails.',
    urlPath: '/mailgun/email/send',
    schema: joi.object({
      config: joi.object().keys({
        mailgunApiKey: joi.string().required(),
        mailgunDomain: joi.string().required(),
      }),
      payload: joi.object().keys({
        to: joi.string().required(),
        from: joi.string().required(),
        subject: joi.string().required(),
        text: joi.string().max(1000).required(),
        recipientVariables: joi.object(),
      })
    })
  }
}
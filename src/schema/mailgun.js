var joi = require('joi')

const allSchemas = {
  mailgunSendMail: {
    title: 'Mailgun Send Email',
    description: 'Mailgun is a service for sending transactional emails.',
    schema: joi.object({
      config: joi.object().keys({
        mailgunApiKey: joi.number().required(),
        mailgunDomain: joi.string().required(),
      }),
      payload: joi.object().keys({
        to: joi.number().required(),
        from: joi.string().required(),
        subject: joi.string().required(),
        text: joi.string().required(),
        recipientVariables: joi.object(),
      })
    })
  }
}
module.exports = allSchemas
// export default allSchemas
var convert = require('joi-to-json-schema')
var fs = require('fs')
var definitions = require('../schema/')
const FILE_LOCATION = './src/schema/_all.json'

console.log('definitions', definitions)
const main = () => {
  const schema = convert(definitions.mailgun.mailgunSendMail.schema)
  const enriched = [
    {
      title: definitions.mailgun.mailgunSendMail.title,
      description: definitions.mailgun.mailgunSendMail.description,
      ...schema,
    },
  ]

  fs.writeFile(FILE_LOCATION, JSON.stringify(enriched, null, 2), err => {
    // throws an error, you could also catch it here
    if (err) throw err

    // success case, the file was saved
    console.log('Schema saved!')
  })
}
main()

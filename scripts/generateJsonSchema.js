/**
 * Converts the Joi schemas into a single JSON schema
 */
var convert = require('joi-to-json-schema')
var fs = require('fs')
var definitions = require('../src/schema/joi/')

const JSON_SCHEMA_DIRECTORY = './src/schema/json/'

const main = () => {

  // Loop through each type
  Object.entries(definitions).map(([type, definitions]) => {
    var all = {}
    var jsonFile = `${JSON_SCHEMA_DIRECTORY}/${type}.json`
    
    // Loop through each action
    Object.entries(definitions).map(([name, definition]) => {
      all[name] = {
        title: definition.title,
        description: definition.description,
        schema: convert(definition.schema),
      }
    })
    fs.writeFile(jsonFile, JSON.stringify(all, null, 2), err => {
      if (err) throw err
      console.log('Schema saved!')
    })
  })
}
main()

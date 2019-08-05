/**
 * Generates the Node-RED nodes from JSON schema
 */
const fs = require('fs')
var convert = require('joi-to-json-schema')
const definitions = require('../src/schema/definitions/')

const NODES_DIRECTORY = './src/node-red/nodes/'

const jsTemplate = (title, urlPath, schema) => {
  let jsName = title.replace(/ /g, '')
  let nodeName = title.toLowerCase().replace(/ /g, '-')
  const payloadProperties = schema.properties.payload.properties
  const payloadValues = Object.entries(payloadProperties).map(
    ([name, details]) => `${name}: config.${name}`
  )
  return `
  const axios = require('axios');
  module.exports = function(RED) {
    function ${jsName}Node(config) {
      RED.nodes.createNode(this, config);
      var node = this;

      node.on('input', function(msg) {
        // Retrieve the config node
        node.server = RED.nodes.getNode(config.server);
        if (!node.server) return node.error("Missing Flock config");

        const host = node.server.host
        const apiKey = node.server.key
        const url = host + '${urlPath}?apikey=' + apiKey
        node.error(config.to);
        node.error(config.body);
        axios.post(url, {
            ${payloadValues.join(',\n            ')}
          })
          .then(function(result) {
            node.log(result.data);
          })
          .catch(function(error) {
            node.error(error);
          })
        
        node.send(msg);
      });
    }
    RED.nodes.registerType("flock-${nodeName}", ${jsName}Node);
  }
  `
}

const htmlTemplate = (title, description, schema) => {
  let nodeName = title.toLowerCase().replace(/ /g, '-')

  // Payload
  const payloadProperties = schema.properties.payload.properties
  const payloadDefaults = Object.entries(payloadProperties).map(
    ([name, details]) => `${name}: { value: '' }`
  )
  const payloadInputs = Object.entries(payloadProperties).map(
    ([name, details]) => `<div class="form-row">
    <label for="node-input-${name}"><i class="icon-tag"></i> ${name}</label>
    <input type="text" id="node-input-${name}" placeholder="">
  </div>`
  )

  return `
  <script type="text/javascript">
    RED.nodes.registerType('flock-${nodeName}',{
        category: 'Flock',
        color: '#D8BFD8',
        defaults: {
          server: { value: '', type: 'flock-config' },
          ${payloadDefaults.join(',\n          ')}
        },
        inputs:1,
        outputs:1,
        icon: "file.png",
        label: function() { return this.name || "flock-${nodeName}"; }
    });
  </script>

  <script type="text/x-red" data-template-name="flock-${nodeName}">
    <div class="form-row">
      <label for="node-input-server"><i class="icon-tag"></i> Flock Config</label>
      <input type="text" id="node-input-server">
    </div>
    ${payloadInputs.join('\n  ')}
  </script>

  <script type="text/x-red" data-help-name="flock-${nodeName}">
    <h2>${title}</h2>
    <p>${description}</p>
  </script>
`
}

// glob.sync('./src/schema/json/**/*.json').forEach(function(file) {
//   var category = require(path.resolve(file))
//   Object.entries(category).map(([type, definition]) => {
//     let title = definition.title
//     let description = definition.description
//     let schema = definition.schema
//     let nodeName = title.toLowerCase().replace(/ /g, '-')
//     fs.writeFile(`${NODES_DIRECTORY}/flock-${nodeName}.js`, jsTemplate(definition), err => {
//       if (err) throw err
//       console.log('Saved JS!')
//     })
//     fs.writeFile(
//       `${NODES_DIRECTORY}/flock-${nodeName}.html`,
//       htmlTemplate(title, description, schema),
//       err => {
//         if (err) throw err
//         console.log('Schema HTML!')
//       }
//     )
//   })
// })

const main = () => {
  // Loop through each type
  Object.entries(definitions).map(([type, definitions]) => {
    // Loop through each action
    Object.entries(definitions).map(([name, definition]) => {
      let title = definition.title
      let description = definition.description
      let urlPath = definition.urlPath
      let schema = convert(definition.schema)
      let nodeName = title.toLowerCase().replace(/ /g, '-')

      fs.writeFile(`${NODES_DIRECTORY}/flock-${nodeName}.js`, jsTemplate(title, urlPath, schema), err => {
        if (err) throw err
        console.log('Saved JS!')
      })
      fs.writeFile(
        `${NODES_DIRECTORY}/flock-${nodeName}.html`,
        htmlTemplate(title, description, schema),
        err => {
          if (err) throw err
          console.log('Schema HTML!')
        }
      )
    })
  })
}
main()

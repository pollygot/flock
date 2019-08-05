/**
 * Generates the Node-RED nodes from JSON schema
 */
const path = require('path')
const glob = require('glob')
const fs = require('fs')

const NODES_DIRECTORY = './src/node-red/nodes/'

const jsTemplate = title => {
  let jsName = title.replace(/ /g, '')
  let nodeName = title.toLowerCase().replace(/ /g, '-')
  return `
  const axios = require('axios');
  module.exports = function(RED) {
    function ${jsName}Node(config) {
      RED.nodes.createNode(this, config);
      var node = this;

      // Retrieve the config node
      node.server = RED.nodes.getNode(config.server);
      if (node.server) {
        node.log("Got Flock config");
        node.on('input', function(msg) {
          node.log("Got Flock config");
          msg.payload = msg.payload.toLowerCase();
          node.send(msg);
        });
      } else {
        node.log("Missing Flock config");
      }
    }
    RED.nodes.registerType("${nodeName}", ${jsName}Node);
  }
  `
}

const htmlTemplate = (title, description, schema) => {
  let nodeName = title.toLowerCase().replace(/ /g, '-')

  // Payload
  const payloadProperties = schema.properties.payload.properties
  const payloadDefaults = Object.entries(payloadProperties).map(([name, details]) => `${name}: ${JSON.stringify(details)}`)
  const payloadInputs = Object.entries(payloadProperties).map(([name, details]) => `<div class="form-row">
    <label for="node-input-${name}"><i class="icon-tag"></i> ${name}</label>
    <input type="text" id="node-input-${name}" placeholder="">
  </div>`)

  return `
  <script type="text/javascript">
    RED.nodes.registerType('${nodeName}',{
        category: 'Flock',
        color: '#D8BFD8',
        defaults: {
          server: { value: '', type: 'flock-config' },
          ${payloadDefaults.join(',\n          ')}
        },
        inputs:1,
        outputs:1,
        icon: "file.png",
        label: function() { return this.name || "${nodeName}"; }
    });
  </script>

  <script type="text/x-red" data-template-name="${nodeName}">
    <div class="form-row">
      <label for="node-input-server"><i class="icon-tag"></i> Flock Config</label>
      <input type="text" id="node-input-server">
    </div>
    ${payloadInputs.join('\n  ')}
  </script>

  <script type="text/x-red" data-help-name="${nodeName}">
    <h2>${title}</h2>
    <p>${description}</p>
  </script>
`
}

glob.sync('./src/schema/json/**/*.json').forEach(function(file) {
  var category = require(path.resolve(file))
  Object.entries(category).map(([type, definition]) => {
    let title = definition.title
    let description = definition.description
    let schema = definition.schema
    let nodeName = title.toLowerCase().replace(/ /g, '-')
    fs.writeFile(`${NODES_DIRECTORY}/flock-${nodeName}.js`, jsTemplate(title), err => {
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

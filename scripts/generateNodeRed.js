/**
 * Generates the Node-RED nodes from JSON schema
 */
const path = require('path')
const glob = require('glob')
const fs = require('fs')

const NODES_DIRECTORY = './src/node-red/nodes/'

const jsTemplate = title => {
  let jsName = title.replace(/ /g, '')
  return `
  module.exports = function(RED) {
    function ${jsName}Node(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function(msg) {
            msg.payload = msg.payload.toLowerCase();
            node.send(msg);
        });
    }
    RED.nodes.registerType("${jsName}", ${jsName}Node);
  }
  `
}

const htmlTemplate = (title, description) => {
  let nodeName = title.toLowerCase().replace(/ /g, '-')
  return `
  <script type="text/javascript">
    RED.nodes.registerType('${nodeName}',{
        category: 'Flock',
        color: '#00e',
        defaults: {
          name: { value: '' }
        },
        inputs:1,
        outputs:1,
        icon: "file.png",
        label: function() {
            return this.name||"${nodeName}";
        }
    });
  </script>

  <script type="text/x-red" data-template-name="${nodeName}">
    <div class="form-row">
      <label for="node-input-name"><i class="icon-tag"></i> Name</label>
      <input type="text" id="node-input-name" placeholder="Name">
    </div>
  </script>

  <script type="text/x-red" data-help-name="${nodeName}">
    <h2>${title}/h2>
    <p>${description}</p>
  </script>
`
}

glob.sync('./src/schema/json/**/*.json').forEach(function(file) {
  var category = require(path.resolve(file))
  Object.entries(category).map(([type, definition]) => {
    let title = definition.title
    let description = definition.description
    fs.writeFile(`${NODES_DIRECTORY}/${type}.js`, jsTemplate(title), err => {
      if (err) throw err
      console.log('Saved JS!')
    })
    fs.writeFile(`${NODES_DIRECTORY}/${type}.html`, htmlTemplate(title, description), err => {
      if (err) throw err
      console.log('Schema HTML!')
    })
  })
})

// const main = () => {

//   // const schema = convert(definitions.mailgun.schema)
//   // const enriched = [{
//   //   title: definitions.mailgun.title,
//   //   description: definitions.mailgun.description,
//   //   ...schema
//   // }]

//   // fs.writeFile('jsonSchema.json', JSON.stringify(enriched, null, 2), (err) => {
//   //   // throws an error, you could also catch it here
//   //   if (err) throw err;

//   //   // success case, the file was saved
//   //   console.log('Schema saved!');
//   // });

//   // enriched.forEach(flock => {
//   //   let title = flock.title
//   //   let description = flock.description

//   //   fs.writeFile('./app/nodes/exampleNode.js', jsTemplate(title), (err) => {
//   //     if (err) throw err;
//   //     console.log('Saved JS!');
//   //   });
//   //   fs.writeFile('./app/nodes/exampleNode.html', htmlTemplate(title, description), (err) => {
//   //     if (err) throw err;
//   //     console.log('Schema HTML!');
//   //   });

//   // });
// }
// main()

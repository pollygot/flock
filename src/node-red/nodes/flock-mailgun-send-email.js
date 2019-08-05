
  const axios = require('axios');
  module.exports = function(RED) {
    function MailgunSendEmailNode(config) {
      RED.nodes.createNode(this, config);
      var node = this;

      node.on('input', function(msg) {
        // Retrieve the config node
        node.server = RED.nodes.getNode(config.server);
        if (!node.server) return node.error("Missing Flock config");

        const host = node.server.host
        const apiKey = node.server.key
        const url = host + undefined '?apiKey=' + apiKey

        axios.post(host)
          .then(function(result) {
            node.log(result.data);
          })
          .catch(function(error) {
            node.error(error);
          })
        
        node.send(msg);
      });
    }
    RED.nodes.registerType("flock-mailgun-send-email", MailgunSendEmailNode);
  }
  
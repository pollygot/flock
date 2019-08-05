
  const axios = require('axios');
  module.exports = function(RED) {
    function TwilioSendSMSNode(config) {
      RED.nodes.createNode(this, config);
      var node = this;

      // Retrieve the config node
      node.server = RED.nodes.getNode(config.server);
      if (node.server) {
        node.debug("Got Flock config");
        node.on('input', function(msg) {
          node.debug("Got Flock config");
          msg.payload = msg.payload.toLowerCase();
          node.send(msg);
        });
      } else {
        node.debug("Missing Flock config");
      }
    }
    RED.nodes.registerType("flock-twilio-send-sms", TwilioSendSMSNode);
  }
  
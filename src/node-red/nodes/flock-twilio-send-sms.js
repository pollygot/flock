
  /**
   * AUTOGENERATED. DO NOT CHANGE.
   */

  const axios = require('axios');
  var handlebars = require('handlebars');
  var handlebarHepers = require('handlebars-helpers')({
    handlebars: handlebars
  });
  handlebars.registerHelper('date', require('helper-date'));

  module.exports = function(RED) {
    function TwilioSendSMSNode(config) {
      RED.nodes.createNode(this, config);
      var node = this;

      node.on('input', function(msg) {
        // Retrieve the config node
        node.server = RED.nodes.getNode(config.server);
        if (!node.server) return node.error("Missing Flock config");

        const host = node.server.host
        const apiKey = node.server.key
        const url = host + '/twilio/sms/send?apikey=' + apiKey

        // Parse any params
        var twilioAccountSid = config.twilioAccountSid.indexOf("{{") != -1 ? handlebars.compile(config.twilioAccountSid)(msg) : config.twilioAccountSid
        var twilioToken = config.twilioToken.indexOf("{{") != -1 ? handlebars.compile(config.twilioToken)(msg) : config.twilioToken
        var to = config.to.indexOf("{{") != -1 ? handlebars.compile(config.to)(msg) : config.to
        var from = config.from.indexOf("{{") != -1 ? handlebars.compile(config.from)(msg) : config.from
        var body = config.body.indexOf("{{") != -1 ? handlebars.compile(config.body)(msg) : config.body

        // Send the message
        axios.post(url, {
            config: {
              twilioAccountSid,
              twilioToken
            },
            payload: {
              to,
              from,
              body
            }
          })
          .then(function(result) {
            node.log(result.data);
          })
          .catch(function(error) {
            node.error(error);
            node.error(error.response.data);
          })
        
        node.send(msg);
      });
    }
    RED.nodes.registerType("flock-twilio-send-sms", TwilioSendSMSNode);
  }
  
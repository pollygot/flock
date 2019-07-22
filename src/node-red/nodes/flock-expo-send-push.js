module.exports = function(RED) {
  function FlockExpoSendPushNode(config) {
    RED.nodes.createNode(this, config)
    var node = this
    node.on('input', function(msg) {
      msg.payload = msg.payload.toLowerCase()
      node.send(msg)
    })
  }
  RED.nodes.registerType('flock-expo-send-push', FlockExpoSendPushNode)
}

module.exports = function(RED) {
  function FlockConfig(config) {
    RED.nodes.createNode(this, config)
    var node = this
    node.host = config.host
    node.key = config.key
  }
  RED.nodes.registerType('flock-config', FlockConfig)
}

module.exports = function(RED: any) {
  class FlockConfig {
    constructor(config: any) {
      RED.nodes.createNode(this, config)
      var node: any = this
      node.host = config.host
      node.key = config.key
    }
  }
  RED.nodes.registerType('flock-config', FlockConfig)
}

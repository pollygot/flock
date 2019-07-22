// import axios from 'axios'


module.exports = function(RED: any) {
  class FlockConfig {
    constructor(config: any) {
      RED.nodes.createNode(this, config)
      var node: any = this
      node.host = config.host
      node.apiKey = config.apiKey
    }
  }

  RED.nodes.registerType('flock-config', FlockConfig)
}

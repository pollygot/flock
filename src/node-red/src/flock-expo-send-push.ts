const toLower = (str: string) => {
  return new Promise((res, rej) => {
    return res(str.toLowerCase())
  })
}

module.exports = function(RED: any) {
  class FlockExpoSendPushNode {
    constructor(config: any) {
      RED.nodes.createNode(this, config)
      var node: any = this

      node.on('input', async (msg: any) => {
        try {
          console.log(node.server)

          var payload = msg.payload || {}
          var server = payload.server || null

          if (server) {
            msg.payload = await toLower(payload.title)
            node.send(msg)
          } else {
            node.error('flock-expo-send-push: no config')
            node.send(msg)
          }
        } catch (error) {
          console.log(error)
          node.send(msg)
        }
      })
    }
  }

  RED.nodes.registerType('flock-expo-send-push', FlockExpoSendPushNode)
}

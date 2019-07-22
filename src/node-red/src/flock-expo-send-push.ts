// import axios from 'axios'

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
        msg.payload = await msg.payload.toLowerCase()
        node.send(msg)
      })
    }
  }

  RED.nodes.registerType('flock-expo-send-push', FlockExpoSendPushNode)
}

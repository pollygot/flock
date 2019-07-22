const should = require('should')
const helper = require('node-red-node-test-helper')
const lowerNode = require('../nodes/flock-expo-send-push.js')

helper.init(require.resolve('node-red'))

const TYPE = 'flock-expo-send-push'
const NAME = 'flock-expo-send-push'

describe('flock-expo-send-push Node', function() {
  beforeEach(function(done) {
    helper.startServer(done)
  })

  afterEach(function(done) {
    helper.unload()
    helper.stopServer(done)
  })

  it('should be loaded', function(done) {
    var flow = [{ id: 'n1', type: TYPE, name: NAME }]
    helper.load(lowerNode, flow, function() {
      var n1 = helper.getNode('n1')
      n1.should.have.property('name', NAME)
      done()
    })
  })

  it('should send a push notification', function(done) {
    const payload = {
      server: {},
      title: 'Node Red',
      body: 'Hello World',
    }
    var flow = [
      { id: 'n1', type: TYPE, name: NAME, wires: [['n2']] },
      { id: 'n2', type: 'helper' },
    ]
    helper.load(lowerNode, flow, function() {
      var n2 = helper.getNode('n2')
      var n1 = helper.getNode('n1')
      n2.on('input', function(msg) {
        msg.should.have.property('payload', 'node red')
        done()
      })
      n1.receive({ payload })
    })
  })
})
